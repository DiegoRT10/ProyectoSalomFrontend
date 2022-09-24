import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, RouterStateSnapshot } from '@angular/router';
import {CrudService, Users } from 'src/app/services/crud.service';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {

  EditUsuario: Users ={
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

  constructor(private CrudService:CrudService, 
              private router:Router,
              private activatedRoute:ActivatedRoute) { }

  ngOnInit(): void {
    const idEntrante = <String>this.activatedRoute.snapshot.params['id'];
    console.log('id de entrada: '+idEntrante);
    this.EditUsuario.id = idEntrante;

    if(idEntrante){
      this.CrudService.getOneUser(this.EditUsuario).subscribe(res=>{
        this.EditUsuario = res[0];
        console.log(res);
        console.log(this.EditUsuario);
      },
      err =>{
        console.log(err);
      });
    }
  }

  EditarUsuario(){
    this.EditUsuario.visible=1;
    if(!this.EditUsuario.token){
      this.EditUsuario.token=null;
    }
    if(!this.EditUsuario.tokenLife){
      this.EditUsuario.tokenLife=null
    }
    this.CrudService.editUser(this.EditUsuario).subscribe(
      res=>{
        console.log('Se edito el usuario');
        this.router.navigate(['private']);
      },
      err =>{
        console.log(err);
      });
  };

}
