import { RoleGuard } from './guards/role.guard';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import decode from 'jwt-decode';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'salom-app';

  
  bandera:boolean=false;
  EstadoToken:boolean=false;

  public static rol:String='';
  constructor(
    private router: Router,
  ) { }

  ngOnInit(): void {
  

  if(localStorage.getItem('token')){
    AppComponent.Rol();
    this.EstadoToken = true;
  }else{
    this.EstadoToken = false;
    AppComponent.rol=''
  }
  }

  public static Rol():void{
    const token = localStorage.getItem('token');
    let decodeToken:any = {}
    decodeToken = decode(token || '');
    AppComponent.rol=decodeToken.role;
   
  }

  get Role(){
    return AppComponent.rol;
  }
  
  Activar():void{
    this.bandera=true;
  }

  deletToken():void{
    localStorage.removeItem('token')
    this.EstadoToken=false;
  }

  

}




