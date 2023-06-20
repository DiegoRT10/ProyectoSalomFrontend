import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Cierres, Administrador, dataCierres, PeopleLocation2, VentaDiariaAdmin, VentaDiariaService, VentaSucursal, dataDepositos, Depositos, DataVentaDiaria, MetaFarmacia, Farmacia, idLocation } from '../../services/venta-diaria.service';
import decode from 'jwt-decode';
import * as moment from 'moment';
import { Observable, Subscription, withLatestFrom } from 'rxjs';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-venta-sucursal',
  templateUrl: './venta-sucursal.component.html',
  styleUrls: ['./venta-sucursal.component.css']
})
export class VentaSucursalComponent implements OnInit {
  day?:number;
  noDiasMes?:number;
  acumulado:number =0;
  acumuladoTitular:number=0;
  acumuladoApoyo:number=0;
  acumuladoRotativo:number=0;
  acumuladoTotal:number=0;
  acumuladoFarmacia:number=0;
  private subs?: Subscription;
  cambioEstado: boolean = false;
  bandera: boolean = false; //sirve para no sobrepasar el limite de registros de cierre
  banderaDeposito: boolean = false; //sirve como bandera para saber si se quiere agregar un deposito
  date: Date = new Date();
  fechaDia: string = moment.utc(this.date).format('DD/MM/YYYY');
  carga?: boolean;
  fecha!: Date;
  faltante: number = 0;
  diasRestantes: number = 0;
  ventaNecesaria: number = 0;
  acumulado2: number = 0;

  constructor(private router: Router, private VentaDiariaService: VentaDiariaService, private spinner: NgxSpinnerService) {
   
    this.day = new Date().getDate(); 
   }



  ListaVentaSucursal?:VentaSucursal[];
  ListPeolpeLocation?:PeopleLocation2[];
  ListaVentaDiaria?:VentaDiariaAdmin[];
  ListaCierres?:Cierres[];
  ListaDepositos?: Depositos[];
  ListaVenta?: DataVentaDiaria[];
  ListaMetas?: MetaFarmacia[];

  dataCierre: dataCierres = {
    host: '',
    ym: '',
  }

  onPeopleLocation:PeopleLocation2 ={
    idpeolple:'',
    idlocation:'',
    meta:0,
    nivel:0,
    dia:0
  }


  ventaSucursal: VentaSucursal ={
    pid:'',
    pname:'',
    venta:0,
    meta:0,
    meta_farm:0,
    idlocation:''
  }

  depositos: Depositos = {
    id: 0,
    numero: 0,
    money: '',
    monto: 0,
    fecha: this.date,
    estado: 0

  }


  data: dataCierres = {
    host:'',
    ym:'',
  }

  idPeople: Administrador ={
    id:''
  }

  VentaDiaria: VentaDiariaAdmin ={
    dia: 0,
    titular: 0,
    apoyo: 0,
    rotativo: 0
  }

  dataDeposito: dataDepositos = {
    money: ''
  }

  Venta: DataVentaDiaria = {
    dia: 0,
    host: '',
    total: 0
  }


  metas: MetaFarmacia = {
    idlocation: '',
    monto: 0,
    datenew: this.fecha,
    dateend: this.fecha
  }

  idFarmacia: idLocation ={
    idlocation: ''
  }

  ngOnInit(): void {
    this.carga = true;
    this.PeopleLocation();
    this.setNoDiasMes();
    
  }

  // ngAfterViewInit() {
  //   this.carga = false;
  // }


  PeopleLocation():void{
    this.getIdLogin();
    this.VentaDiariaService.getOnPeople(this.idPeople).subscribe(res=>{
      //this.ListaVentaSucursal=<any>res;
      this.onPeopleLocation = res[0];
      this.VentaAdministrador();
      this.VentaAdminApoyo();
      this.VentaCierres();
      this.MetaFarmacia();
      this.carga = false;
    },
    err =>{
      console.log(err);
    }
      
      );
  }

  VentaCierres(): void {
    this.dataCierre.ym = this.getFecha();
    this.dataCierre.host = this.onPeopleLocation.idlocation;
    this.VentaDiariaService.getCierresAdmin(this.dataCierre).subscribe(res => {
      this.ListaCierres = <any>res;
      // this.depos();
    },
      err => {
        console.log(err);
      });


  }




  VentaAdministrador():void{
    this.data.host=this.onPeopleLocation.idlocation;
    this.data.ym=this.getFecha();

    this.VentaDiariaService.getVentaSucursal(this.data).subscribe(res=>{
      this.ListaVentaSucursal=<any>res;
      //this.Venta = res[0];
    },
    err =>{
      console.log(err);
    }
      
      );
  }


  getIdLogin():void{
    const token = localStorage.getItem('token');
    let decodeToken:any = {}
    decodeToken = decode(token || '');
    this.idPeople.id = decodeToken.id;
    
  }

  getFecha(): string {
    let date: Date = new Date();
    return moment.utc(date).format('YYYYMM');
  }


  redondear(valor:number):number{
    return Number(valor.toFixed(2));
  }


  setNoDiasMes():void{
    let date: Date = new Date();
    this.noDiasMes = this.diasEnUnMes(date.getMonth()+1,date.getFullYear());//se le suma +1 al mes porque para typescript enero = 0
  }

  diasEnUnMes(mes:number, año:number) {
    return new Date(año, mes, 0).getDate();
  }

  VentaAdminApoyo():void{
    this.data.host=this.onPeopleLocation.idlocation;
     this.data.ym=this.getFecha(); //descomentar cunado se realice la prueba 
    //this.data.ym='202203';

      this.VentaDiariaService.getVentaDiaria(this.data).subscribe(res=>{
      this.ListaVentaDiaria=<any>res;
      this.totalesVenta();
      //this.Venta = res[0];
    },
    err =>{
      console.log(err);
    }
      
      );
  }

  setAcumulado(data: number) {
    this.acumulado = data;
    return this.acumulado;
  }

  getAcumulado(venta: number) {
    return this.acumulado += venta;
  }

  totalesVenta():void{
  for (const i of this.ListaVentaDiaria!) {
   this.acumuladoTitular += i.titular;
   this.acumuladoApoyo += i.apoyo;
   this.acumuladoRotativo += i.rotativo;  
   this.acumuladoTotal +=   (i.titular + i.apoyo + i.rotativo)
  }
  this.acumuladoFarmacia = this.acumuladoTitular + this.acumuladoApoyo + this.acumuladoRotativo;
  }

  Transacciones(money: string): void {
    this.dataDeposito.money = money;
    this.VentaDiariaService.getTransacciones(this.dataDeposito).subscribe(res => {
      this.ListaDepositos = <any>res;
    },
      err => {
        console.log(err);
      }

    );
  }

  CambioDeposito(depos: any, estado: number): void {
    this.depositos = depos;
    this.depositos.estado = estado;
    if (estado == 0 || estado == 1) {
      this.VentaDiariaService.putDepositos(this.depositos).subscribe(res => {
        //this.ListaDepositos=<any>res;
        //this.Venta = res[0];
        this.cambioEstado = false;
        this.Transacciones(this.depositos.money);
      },
        err => {
          console.log(err);
        }

      );

    } else if (estado == 2) {
      this.cambioEstado = true;
    }

  }

  VisibleNumero(f: boolean, depos: any, idDepo:number, numeroDepo:number) {
    this.depositos.id = idDepo;
    this.depositos.numero = numeroDepo;
    this.bandera = f;
    this.banderaDeposito = false;
    
  }

  OpenRegistroDeposito(x:boolean):void{
    this.depositos.numero=0;
    this.depositos.monto=0;
    this.banderaDeposito = x;
  }

  SaveRegistroDeposito():void{
    this.depositos.money = this.dataDeposito.money;


    this.VentaDiariaService.addDeposito(this.depositos).subscribe(
      res => {
 
        alert(JSON.stringify(res));
        this.OpenRegistroDeposito(false);
        this.Transacciones(this.depositos.money);
        this.depositos.numero=0;
        this.depositos.monto=0;
      },
      err => {
        alert('Error al insertar '+err);
        console.log(err);
      });

  }

  UpdataRegistroDeposito():void{
   
  
    this.depositos.money = this.dataDeposito.money;

    this.VentaDiariaService.editDeposito(this.depositos).subscribe(
      res => {
        this.Transacciones(this.depositos.money);
        this.depositos.numero=0;
        this.depositos.monto=0;
        this.bandera = true;
        this.OpenRegistroDeposito(false);
        this.VisibleNumero(false,null,0,0);
      },
      err => {
        console.log(err);
      });


  }

  getVentaDiaria(host: string, ym: string): void {
    let date: Date = new Date();
    this.Venta.host = host;
    this.Venta.dia = <any>ym;
    this.VentaDiariaService.getOneVenta(this.Venta).subscribe(res => {
      this.ListaVenta = <any>res;

      this.Venta = res[0];
      for (const j of this.ListaMetas!) {
          for (const i of this.ListaVenta!) {
            if (i.host == j.idlocation) {
              this.Venta.dia = i.dia;
              this.Venta.host = i.host;
              this.Venta.total = i.total;
              this.metas.monto = j.monto;
              this.faltante = j.monto - i.total;

              this.diasRestantes = this.noDiasMes! - date.getDate();
              this.ventaNecesaria = this.faltante / this.diasRestantes
            }
          } 
      }


    },
      err => {
        console.log(err);
      }

    );

  }

  MetaFarmacia(): void {
    this.idFarmacia.idlocation = this.onPeopleLocation.idlocation;
    this.VentaDiariaService.getOneMeta(this.idFarmacia).subscribe(res => {
      this.ListaMetas = <any>res;
      //this.Venta = res[0];
      this.getVentaDiaria(this.onPeopleLocation.idlocation,this.getFecha());
    },
      err => {
        console.log(err);
      }

    );
  }

}
