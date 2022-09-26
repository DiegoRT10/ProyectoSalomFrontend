import { CrudService, Users } from 'src/app/services/crud.service';
import { Component, OnInit } from '@angular/core';
//import { CrudService, Users } from './../../services/crud.service';
import { Route, Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  public formLogin!: FormGroup;

  listaOp:String[] = ['Sistemas','Gerente', 'Administrador','Invitado'];
  listaOpAudi:String[] =['Si', 'No'];

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

  constructor(private CrudService:CrudService, private router:Router, private formBuilder: FormBuilder) { }

  ngOnInit(): void {


    this.formLogin = this.formBuilder.group( {
      email:['',[Validators.required, Validators.email]],
      password:['', Validators.required]
    });


  }

  AgregarUsuario(){
    this.AggUsuario.visible=1;
    if(!this.AggUsuario.token){
      this.AggUsuario.token=null;
    }
    if(!this.AggUsuario.tokenLife){
      this.AggUsuario.tokenLife=null
    }
    switch(<any>this.AggUsuario.role){
      case 'Sistemas':
        this.AggUsuario.role=0;
        console.log(this.AggUsuario.role);
        break
      case 'Gerente':
        this.AggUsuario.role=1;
        console.log(this.AggUsuario.role);
        break;
      case 'Administrador':
        this.AggUsuario.role=2
        console.log(this.AggUsuario.role);
        break;
      case 'Invitado':
        this.AggUsuario.role=3
        console.log(this.AggUsuario.role);
        break;
    }

    switch(<any>this.AggUsuario.auditor){
      case 'No': this.AggUsuario.auditor = 0;
      break;
      case 'Si': this.AggUsuario.auditor = 1;
      break; 
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
