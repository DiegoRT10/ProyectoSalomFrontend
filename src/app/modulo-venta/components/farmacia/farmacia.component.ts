import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MetaFarmacia, VentaDiaria, VentaDiariaService, VentaMes, DatosGrafica, PeopleLocation, VentaPorDia, dataVenta } from '../../services/venta-diaria.service';
import * as moment from 'moment';



@Component({
  selector: 'app-farmacia',
  templateUrl: './farmacia.component.html',
  styleUrls: ['./farmacia.component.css'],
})


export class FarmaciaComponent implements OnInit {
  idEntrante:string='';
  faltante:number=0;
  diasRestantes:number=0;
  noDiasMes: any = 0;
  ventaNecesaria:number = 0;
  acumulado:number = 0;
  ym:string='';
  date: Date = new Date();
  fechaDia:string = moment.utc(this.date).format('DD/MM/YYYY');

  constructor(private router: Router, private VentaDiariaService: VentaDiariaService) { }
  fecha!: Date;
  ListaVenta?: VentaDiaria[];
  ListaMetas?: MetaFarmacia[];
  ListaPeopleLocation?: PeopleLocation[]; 
  ListaVentaPorDia?: VentaPorDia[]; 
  single?: DatosGrafica[];

  Venta: VentaDiaria = {
    dia:0,
    host:'',
    total:0
  }

  metas: MetaFarmacia ={
    idlocation:'',
    monto:0,
    datenew:this.fecha,
    dateend:this.fecha
  }

  ventaMes: VentaMes ={
    mes: ''
  }

  dataVenta: dataVenta ={
    host:'',
    ym:'',
    pay:''
  }

  people: PeopleLocation ={
    id:'',
    name:'',
    apppassword:'',
    card:0,
    role:0,
    visible:0,
    image:'',
    auditor:0,
    token:'',
    tokenLife:'',
    idpeople: '',
    idlocation: '',
    meta: 0,
    nivel: 0,
    dia: 0
  }

  ventaDia: VentaPorDia ={
    dia:0,
    titular:0
  }

  ngOnInit(): void {
    let date: Date = new Date();
    this.noDiasMes = this.diasEnUnMes(date.getMonth()+1,date.getFullYear());//se le suma +1 al mes porque para typescript enero = 0
    this.idEntrante = localStorage.getItem('idFar')!;
    this.peopleLocation();
    this.MetaFarmacia();
    this.VentaPorDia();
    
    
  }

  
 peopleLocation():void{
  this.people.idlocation=this.idEntrante;
  this.VentaDiariaService.getPeopleLocation(this.people).subscribe(res=>{
    this.people=<any>res;
    this.ListaPeopleLocation=<any>res;
  },
  err =>{
    console.log(err);
  }
    
    );
 }

 VentaDiaria(cash:string,ym:string):void{
  let date: Date = new Date();
  this.Venta.host=cash;
  this.Venta.dia=<any>ym;
  this.VentaDiariaService.getOneVenta(this.Venta).subscribe(res=>{
    this.ListaVenta=<any>res;
    
    this.Venta = res[0];
    for (const j of this.ListaMetas!) {
      if(j.idlocation == this.idEntrante){
      for (const i of this.ListaVenta!) {
        if(i.host == j.idlocation){
          this.Venta.dia = i.dia;
          this.Venta.host = i.host;
          this.Venta.total = i.total;
          this.metas.monto = j.monto;
          this.faltante = j.monto - i.total;
          
          this.diasRestantes = this.noDiasMes - date.getDate();
          this.ventaNecesaria = this.faltante/this.diasRestantes
        }
      }  
    }
    }
    
    
  },
  err =>{
    console.log(err);
  }
    
    );

}

MetaFarmacia():void{
  this.VentaDiariaService.getMetas().subscribe(res=>{
    this.ListaMetas=<any>res;
    //this.Venta = res[0];
    this.VentaDiaria('cash','202212');
  },
  err =>{
    console.log(err);
  }
    
    );
}

VentaPorDia():void{
  this.dataVenta.host = this.idEntrante;
  this.dataVenta.ym=this.setFecha();
  this.dataVenta.pay='cash'
  this.VentaDiariaService.getVentaDia(this.dataVenta).subscribe(res=>{
    this.ListaVentaPorDia=<any>res;
    
  },
  err =>{
    console.log(err);
  }
    
    );
 }


diasEnUnMes(mes:number, año:number) {
	return new Date(año, mes, 0).getDate();
}


setFecha():string{
  let date: Date = new Date();
  return moment.utc(date).format('YYYYMM');
}

getAcumulado(venta:number){
return this.acumulado+=venta;
}


setAcumulado(titular:number){
this.acumulado = titular;
return this.acumulado;
}
}
