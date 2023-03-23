import { CrudProfileService } from './../../services/crud-profile.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Users,CrudService } from 'src/app/services/crud.service';
import { ProfileNomina } from '../../services/crud-profile.service';



@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  fecha!: Date;

  ProfileNomina:ProfileNomina ={
  id:'', 
  Location:'', 
  salario:0.0, 
  Puesto:'', 
  Etapa:'', 
  fechaIngreso:this.fecha, 
  fechaFin:this.fecha, 
  fechaPago:this.fecha, 
  estado:''
  };

  Usuario: Users ={
    id:'',
    name:'',
    apppassword:'',
    card:0,
    role:0,
    visible:1,
    image:'',
    auditor:0,
    token:null,
    tokenLife:null,
  };
  carga?: boolean;
  constructor(private CrudService:CrudService, private CrudProfileService:CrudProfileService, private router:Router, private activatedRoute:ActivatedRoute) { }

  ngOnInit(): void {
    this.carga = true;
    this.getUser();
    this.getProfile();
  }

  ngAfterViewInit() {
    this.carga = false;
  }

  goUpdateProfile():void{
    this.router.navigate(['update-profile']);
  }
 
  getUser():void{

    const idL = localStorage.getItem('id');
    
    this.Usuario.id=<String>idL;
    if(idL){
      this.CrudService.getOneUser(this.Usuario).subscribe(res=>{
        this.Usuario = res[0];
        console.log(this.Usuario.name);
      },
      err =>{
        console.log(err);
      });
    }

  }
  

  getProfile():void{

    const idL = localStorage.getItem('id');
    
    this.ProfileNomina.id=<String>idL;
    if(idL){
      this.CrudProfileService.getProfileNomina(this.ProfileNomina).subscribe(res=>{
        this.ProfileNomina = res[0];
        console.log('datos profile',this.ProfileNomina);
        console.log('location',this.ProfileNomina.Location);
      },
      err =>{
        console.log(err);
      });
    }

  }

}


