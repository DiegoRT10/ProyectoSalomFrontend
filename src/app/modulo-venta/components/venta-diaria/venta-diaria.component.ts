import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Administrador, Farmacia, PeopleLocation2, VentaDiariaService, VentaProductos } from '../../services/venta-diaria.service';
import decode from 'jwt-decode';

@Component({
  selector: 'app-venta-diaria',
  templateUrl: './venta-diaria.component.html',
  styleUrls: ['./venta-diaria.component.css']
})
export class VentaDiariaComponent implements OnInit{
  carga?:boolean;
  flag?:boolean;
  acumulado:number = 0;

  ListVentaProductos?:VentaProductos[];

  idFarmacia: Farmacia ={
    id: ''
  }

  idPeople: Administrador ={
    id:''
  }

  onPeopleLocation:PeopleLocation2 ={
    idpeolple:'',
    idlocation:'',
    meta:0,
    nivel:0,
    dia:0
  }



  
  constructor(private router: Router, private VentaDiariaService: VentaDiariaService){
    this.flag = true;
  }

  ngOnInit(): void {
    this.carga = true;
    this.PeopleLocation();
  }

  ngAfterViewInit() {
    this.carga = false;
  }


  VentaProductos(): void {
    this.idFarmacia.id = this.onPeopleLocation.idlocation;
    this.VentaDiariaService.getVentaProductos(this.idFarmacia).subscribe(res => {
      this.ListVentaProductos = <any>res;
      this.flag = false;
    },
      err => {
        console.log(err);
      });


  }
  
  PeopleLocation():void{
    this.getIdLogin();
    this.VentaDiariaService.getOnPeople(this.idPeople).subscribe(res=>{
      //this.ListaVentaSucursal=<any>res;
      this.onPeopleLocation = res[0];
      this.VentaProductos();
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

  setAcumulado(cant: number):void {
   this.acumulado += cant;
  }



}
