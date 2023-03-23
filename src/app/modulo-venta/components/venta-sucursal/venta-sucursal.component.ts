import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Cierres, Administrador, dataCierres, PeopleLocation2, VentaDiariaAdmin, VentaDiariaService, VentaSucursal, dataDepositos, Depositos } from '../../services/venta-diaria.service';
import decode from 'jwt-decode';
import * as moment from 'moment';
import { Observable, Subscription } from 'rxjs';
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
  private subs?: Subscription;
  cambioEstado: boolean = false;
  bandera: boolean = false; //sirve para no sobrepasar el limite de registros de cierre
  banderaDeposito: boolean = false; //sirve como bandera para saber si se quiere agregar un deposito
  date: Date = new Date();
  fechaDia: string = moment.utc(this.date).format('DD/MM/YYYY');

  constructor(private router: Router, private VentaDiariaService: VentaDiariaService, private spinner: NgxSpinnerService) {
   
    this.day = new Date().getDate(); 
    console.log('fecha dia',this.day)
   }



  ListaVentaSucursal?:VentaSucursal[];
  ListPeolpeLocation?:PeopleLocation2[];
  ListaVentaDiaria?:VentaDiariaAdmin[];
  ListaCierres?:Cierres[];
  ListaDepositos?: Depositos[];

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
    dia:0,
    titular:0,
    apoyo:0
  }

  dataDeposito: dataDepositos = {
    money: ''
  }

  ngOnInit(): void {
    this.spinner.show();
    this.PeopleLocation();
    this.setNoDiasMes();
    this.spinner.hide();
  }


  PeopleLocation():void{
    this.getIdLogin();
    console.log('Este es el id',this.idPeople.id);
    this.VentaDiariaService.getOnPeople(this.idPeople).subscribe(res=>{
      //this.ListaVentaSucursal=<any>res;
      this.onPeopleLocation = res[0];
      this.VentaAdministrador();
      this.VentaAdminApoyo();
      this.VentaCierres();
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
      console.log('Cierres ',this.ListaCierres);
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
    console.log('Este es el token',decodeToken.id);
    
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
    // this.data.ym=this.getFecha(); descomentar cunado se realice la prueba 
    this.data.ym='202203';

      this.VentaDiariaService.getVentaDiaria(this.data).subscribe(res=>{
      this.ListaVentaDiaria=<any>res;
      console.log(this.ListaVentaDiaria);
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
    console.log(i.titular, i.apoyo);
    (i.titular == 0 ? this.acumuladoTitular= 0 : this.acumuladoTitular += i.titular);
    (i.apoyo == 0 ? this.acumuladoApoyo = 0 : this.acumuladoApoyo += i.apoyo);
    
  }
  }

  Transacciones(money: string): void {
    this.dataDeposito.money = money;
    this.VentaDiariaService.getTransacciones(this.dataDeposito).subscribe(res => {
      this.ListaDepositos = <any>res;
      //this.Venta = res[0];
      console.log("depositos ",this.ListaDepositos)
    },
      err => {
        console.log(err);
      }

    );
  }

  CambioDeposito(depos: any, estado: number): void {
    this.depositos = depos;
    this.depositos.estado = estado;
    console.log(this.depositos);
    if (estado == 0 || estado == 1) {
      this.VentaDiariaService.putDepositos(this.depositos).subscribe(res => {
        //this.ListaDepositos=<any>res;
        //this.Venta = res[0];
        console.log(this.ListaDepositos);
        console.log('entre a cambio deposito');
        this.cambioEstado = false;
        this.Transacciones(this.depositos.money);
      },
        err => {
          console.log(err);
        }

      );

    } else if (estado == 2) {
      console.log('entre a cambio deposito 2');
      this.cambioEstado = true;
    }

  }

  VisibleNumero(f: boolean, depos: any, idDepo:number, numeroDepo:number) {
    this.depositos.id = idDepo;
    this.depositos.numero = numeroDepo;
    this.bandera = f;
    console.log('este es el numero de deposito ',this.depositos.numero);
    //this.idDeposito = id;
    // this.depositos = depos;
    // console.log('depos ', this.depositos);
    
  }

  OpenRegistroDeposito(x:boolean):void{
    this.depositos.numero=0;
    this.depositos.monto=0;
    //console.log("Datos a envaiar de deposito ",this.depositos.money," ",this.depositos.numero," ",this.depositos.monto);
    this.banderaDeposito = x;
  }

  SaveRegistroDeposito():void{
    this.depositos.money = this.dataDeposito.money;
    console.log("Datos a envaiar de deposito ",this.depositos.money," ",this.depositos.numero," ",this.depositos.monto);

    this.VentaDiariaService.addDeposito(this.depositos).subscribe(
      res => {
        console.log('Se agrego el deposito correctamente');
        this.OpenRegistroDeposito(false);
        this.Transacciones(this.depositos.money);
        this.depositos.numero=0;
        this.depositos.monto=0;
      },
      err => {
        console.log(err);
      });

  }

  UpdataRegistroDeposito():void{
   
  
    this.depositos.money = this.dataDeposito.money;
    console.log("Datos a envaiar de deposito ",this.depositos.money," ",this.depositos.numero," ",this.depositos.monto);

    this.VentaDiariaService.editDeposito(this.depositos).subscribe(
      res => {
        console.log('Se edito el deposito correctamente');
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

  



}
