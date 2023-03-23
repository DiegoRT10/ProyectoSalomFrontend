import { Etapas, CrudEtapaService } from './../../services/crud-etapa.service';
import { CrudPuestoService, Puestos } from './../../services/crud-puesto.service';
import { Component, ModuleWithComponentFactories, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CrudProfileService, Profiles, Locations } from '../../services/crud-profile.service';
import { DatePipe } from '@angular/common';
import * as moment from 'moment';

@Component({
  selector: 'app-update-profile',
  templateUrl: './update-profile.component.html',
  styleUrls: ['./update-profile.component.css'],
  providers: [DatePipe]
})
export class UpdateProfileComponent implements OnInit {

  date = new Date();
 fecha!: Date;

  listaOpLocations?: Locations[];

  listaOpPuestos?: Puestos[];

  listaOpEtapas?: Etapas[];

  listaOpEstado: String[] = ['Activo', 'Suspendido', 'Despedido'];

  PuestoId:String = '';
  EtapaId:String = '';




  EditProfile: Profiles ={
    id:'', 
  idLocation:'', 
  salario:0.0, 
  idPuesto:'', 
  idEtapa:'', 
  fechaIngreso:this.fecha,
  fechaFin:this.fecha, 
  fechaPago:this.fecha, 
  estado:''
    }
  carga?: boolean;



  constructor(private miDatePipe: DatePipe, 
              private crudProfileService:CrudProfileService, 
              private crudPuestoService:CrudPuestoService, 
              private crudEtapaService:CrudEtapaService, 
              private router:Router, 
              private activatedRoute:ActivatedRoute) { }

  ngOnInit(): void {
    this.carga = true;
    this.getOneProfile();
    this.listarLocations();
    this.listarPuestos();
    this.listarEtapas();

  }


  ngAfterViewInit() {
    this.carga = false;
  }


getOneProfile(): void{
  const idEntrante = localStorage.getItem('id');
  console.log('id de entrada: '+idEntrante);
  this.EditProfile.id=<String>idEntrante;



  if(idEntrante){
    this.crudProfileService.getOneProfile(this.EditProfile).subscribe(res=>{
      this.EditProfile = res[0];
      switch(this.EditProfile.estado){
        case '1':
          this.EditProfile.estado='Activo';
          break;
        case '2':
          this.EditProfile.estado='Suspendido';
          break;
        case '3':
          this.EditProfile.estado='Despedido';
          break;
      }
      

     this.date = new Date(this.EditProfile.fechaIngreso); 
     this.fecha = this.EditProfile.fechaIngreso;
     console.log('elemento ', this.EditProfile.fechaIngreso);
     console.log('fecha parse ',moment.utc(this.date).format('MM/DD/YYYY'));
     console.log('fecha desde el backend ',this.date);
     // this.EditProfile.fechaIngreso = this.miDatePipe.transform(this.EditProfile.fechaIngreso, 'yyyy-MM-dd')
      //console.log('fecha: ',this.miDatePipe.transform(this.date, 'yyyy-MM-dd'))

      console.log(res);
    },
    err =>{
      console.log(err);
    }
      
      );
    }
}

  EditarProfile():void{

    switch(this.EditProfile.estado){
      case 'Activo':
        this.EditProfile.estado='1';
        break;
      case 'Suspendido':
        this.EditProfile.estado='2';
        break;
      case 'Despedido':
        this.EditProfile.estado='3';
        break;
    }

    console.log('este es el id de puesto con EditProfile',this.EditProfile.idPuesto);
    console.log('este es el id de puesto con Variable',this.PuestoId);
    const idEntrante = localStorage.getItem('id');
    console.log('id de entrada: '+idEntrante);
    this.EditProfile.id=<String>idEntrante;

    console.log('este es el id ',this.EditProfile.id);
    console.log('este es el Profile ',this.EditProfile);

    this.crudProfileService.editProfile(this.EditProfile).subscribe(
      res => {
        console.log('Se edito el profile');
        //this.router.navigate(['profile']);
      },
      err => {
        console.log(err);
      });
  }

  listarLocations():void{
    this.crudProfileService.getLocation().subscribe(
      res=>{
        this.listaOpLocations=<any>res;     
        console.log(this.listaOpLocations);
      },
      err =>{
        console.log(err);
      }
    );
  
  }

  listarPuestos():void{
    this.crudPuestoService.getPuesto().subscribe(
      res=>{
        this.listaOpPuestos=<any>res;     
        console.log(this.listaOpPuestos);
      },
      err =>{
        console.log(err);
      }
    );
  
  }

  listarEtapas():void{
    this.crudEtapaService.getEtapa().subscribe(
      res=>{
        this.listaOpEtapas=<any>res;     
        console.log(this.listaOpEtapas);
      },
      err =>{
        console.log(err);
      }
    );
  
  }

  comparar():any{
    const idEntrante = localStorage.getItem('id');
    if (this.EditProfile.id==null || idEntrante==null) {
      return false;
    }
    return this.EditProfile.id===idEntrante;
  }


  
}
