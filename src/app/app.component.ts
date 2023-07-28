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
  static viewBar: boolean = true;
  
 
  // EstadoToken?:boolean;
  // Rol?:number;
  static EstadoToken: boolean;
  static Rol: number;
  static Id: string;

  
  constructor(private router: Router) {
    
   }

  ngOnInit(): void {
  AppComponent.verificarRol();
  }



  deletToken():void{
    localStorage.removeItem('token')
    AppComponent.EstadoToken=false;
    localStorage.setItem('rol','00');
  }

   static verificarRol(){
    if(localStorage.getItem('token')){
      this.EstadoToken = true;
    if(localStorage.getItem('rol')){
      this.Rol = Number(localStorage.getItem('rol'));     
    }
    if(localStorage.getItem('idUser')){
      this.Id = <string>localStorage.getItem('idUser');
    }
  }else{
    this.EstadoToken = false;
  }
}

get viewBar(){
  return AppComponent.viewBar;
}

get Rol(){
  return AppComponent.Rol;
}

get Id(){
  return AppComponent.Id;
}


get EstadoToken(){
  return AppComponent.EstadoToken;
}


}
