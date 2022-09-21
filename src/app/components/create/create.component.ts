import { CrudService, Users } from 'src/app/services/crud.service';
import { Component, OnInit } from '@angular/core';
//import { CrudService, Users } from './../../services/crud.service';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {
  AggUsuario: Users={
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

  constructor(private CrudService:CrudService, private router:Router) { }

  ngOnInit(): void {
  }

  AgregarUsuario(){
    this.AggUsuario.visible=1;
    if(!this.AggUsuario.token){
      this.AggUsuario.token=null;
    }
    if(!this.AggUsuario.tokenLife){
      this.AggUsuario.tokenLife=null
    }
    this.CrudService.addUser(this.AggUsuario).subscribe(
      res=>{
        console.log('Se agrego el usuario');
        this.router.navigate(['private']);
      },
      err =>{
        console.log(err);
      });
    
  }
  
}
