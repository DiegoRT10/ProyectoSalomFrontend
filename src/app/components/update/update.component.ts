import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, RouterStateSnapshot } from '@angular/router';
import {CrudService, Users } from 'src/app/services/crud.service';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {

  EditUsuario: Users={
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
    const idEntrante = this.activatedRoute.snapshot.params['id'];
    console.log('id de entrada: '+idEntrante)

    if(idEntrante){
      this.CrudService.editUser(idEntrante).subscribe(res=>{
        
        //this.EditUsuario = res;
      },
      err =>{
        console.log(err);
      });
    }
  }

  EditarUsuario(){

  };

}
