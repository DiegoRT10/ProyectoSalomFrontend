import { Etapas, CrudEtapaService } from './../../services/crud-etapa.service';
import { CrudPuestoService, Puestos } from './../../services/crud-puesto.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CrudProfileService, Profiles, Locations } from '../../services/crud-profile.service';

@Component({
  selector: 'app-update-profile',
  templateUrl: './update-profile.component.html',
  styleUrls: ['./update-profile.component.css']
})
export class UpdateProfileComponent implements OnInit {

  date = new Date();

  listaOpLocations?: Locations[];

  listaOpPuestos?: Puestos[];

  listaOpEtapas?: Etapas[];



  EditProfile: Profiles ={
    id:'', 
  idLocation:'', 
  salario:0, 
  idPuesto:'', 
  idEtapa:'', 
  fechaIngreso:this.date, 
  fechaFin:this.date, 
  fechaPago:this.date, 
  estado:''
    }

  constructor(private crudProfileService:CrudProfileService, private crudPuestoService:CrudPuestoService, private crudEtapaService:CrudEtapaService, private router:Router, private activatedRoute:ActivatedRoute) { }

  ngOnInit(): void {
    this.listarLocations();
    this.getOneProfile();
    this.listarPuestos();
    this.listarEtapas();
    

  }


getOneProfile(): void{
  const idEntrante = localStorage.getItem('idPro');
  console.log('idPro de entrada: '+idEntrante);
  this.EditProfile.id=<String>idEntrante;

  if(idEntrante){
    this.crudProfileService.getOneProfile(this.EditProfile).subscribe(res=>{
      this.EditProfile = res[0];
      console.log(res);
    },
    err =>{
      console.log(err);
    }
      
      );
    }
}

  EditarPuesto():void{
    this.crudProfileService.editProfile(this.EditProfile).subscribe(
      res => {
        console.log('Se edito el profile');
        this.router.navigate(['profile']);
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



  
}
