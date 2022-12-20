import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MetaFarmacia, VentaDiaria, VentaDiariaService, VentaMes, DatosGrafica, PeopleLocation } from '../../services/venta-diaria.service';

@Component({
  selector: 'app-farmacia',
  templateUrl: './farmacia.component.html',
  styleUrls: ['./farmacia.component.css']
})
export class FarmaciaComponent implements OnInit {
  idEntrante:string='';
  constructor(private router: Router, private VentaDiariaService: VentaDiariaService) { }
  fecha!: Date;
  ListaVenta?: VentaDiaria[];
  ListaMetas?: MetaFarmacia[];
  ListaPeopleLocation?: PeopleLocation[]; 

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

  ngOnInit(): void {
    this.idEntrante = localStorage.getItem('idFar')!;
    this.peopleLocation();
  }

  
 peopleLocation():void{
  this.people.idlocation=this.idEntrante;
  this.VentaDiariaService.getPeopleLocation(this.people).subscribe(res=>{
    this.people=<any>res;
    this.ListaPeopleLocation=<any>res;
    console.log(this.people);
  },
  err =>{
    console.log(err);
  }
    
    );
 }

}
