import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Cierres, Administrador, dataCierres, PeopleLocation2, VentaDiariaAdmin, VentaDiariaService, VentaSucursal, dataDepositos, Depositos } from '../../services/venta-diaria.service';
import decode from 'jwt-decode';
import * as moment from 'moment';
import { Subscription } from 'rxjs';

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

  constructor(private router: Router, private VentaDiariaService: VentaDiariaService) {
   
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
    this.PeopleLocation();
    this.setNoDiasMes();
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
    this.data.ym=this.getFecha();

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
      console.log("depositos",this.ListaDepositos)
    },
      err => {
        console.log(err);
      }

    );
  }
}
