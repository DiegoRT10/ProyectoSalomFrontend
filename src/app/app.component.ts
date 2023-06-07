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

  
 
  // EstadoToken?:boolean;
  // Rol?:number;
  static EstadoToken: boolean;
  static Rol: number;

  
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
  }else{
    this.EstadoToken = false;
  }
}

get Rol(){
  return AppComponent.Rol;
}

get EstadoToken(){
  return AppComponent.EstadoToken;
}


}
