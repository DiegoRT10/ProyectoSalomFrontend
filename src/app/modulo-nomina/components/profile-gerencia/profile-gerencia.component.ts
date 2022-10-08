import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Users,CrudService } from 'src/app/services/crud.service';


@Component({
  selector: 'app-profile-gerencia',
  templateUrl: './profile-gerencia.component.html',
  styleUrls: ['./profile-gerencia.component.css']
})
export class ProfileGerenciaComponent implements OnInit {
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
  constructor( private activatedRoute:ActivatedRoute, private CrudService:CrudService) { }

  ngOnInit(): void {

    const idL = localStorage.getItem('id');
    
    this.EditUsuario.id=<String>idL;
    if(idL){
      this.CrudService.getOneUser(this.EditUsuario).subscribe(res=>{
        this.EditUsuario = res[0];
        console.log(this.EditUsuario.name);
      },
      err =>{
        console.log(err);
      });
    }
      

  }
    
}


