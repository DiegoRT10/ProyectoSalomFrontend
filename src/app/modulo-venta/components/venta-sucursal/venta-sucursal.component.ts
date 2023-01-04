import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Administrador, dataCierres, PeopleLocation2, VentaDiariaService, VentaSucursal } from '../../services/venta-diaria.service';
import decode from 'jwt-decode';
import * as moment from 'moment';

@Component({
  selector: 'app-venta-sucursal',
  templateUrl: './venta-sucursal.component.html',
  styleUrls: ['./venta-sucursal.component.css']
})
export class VentaSucursalComponent implements OnInit {
  day?:number;
  constructor(private router: Router, private VentaDiariaService: VentaDiariaService) {
   
    this.day = new Date().getDate(); 
    console.log('fecha dia',this.day)
   }

  ListaVentaSucursal?:VentaSucursal[];
  ListPeolpeLocation?:PeopleLocation2[];


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


  ngOnInit(): void {
    this.PeopleLocation();
    
  }


  PeopleLocation():void{
    this.getIdLogin();
    console.log('Este es el id',this.idPeople.id);
    this.VentaDiariaService.getOnPeople(this.idPeople).subscribe(res=>{
      //this.ListaVentaSucursal=<any>res;
      this.onPeopleLocation = res[0];
      this.VentaAdministrador();
    },
    err =>{
      console.log(err);
    }
      
      );
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

  

}
