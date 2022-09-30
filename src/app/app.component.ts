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
  public static rol:String='';
  constructor(
    private router: Router,
  ) { }

  ngOnInit(): void {
  AppComponent.Rol();
  }

  public static Rol():void{
    const token = localStorage.getItem('token');
    let decodeToken:any = {}
    decodeToken = decode(token || '');
    console.log(decodeToken.role);
    AppComponent.rol=decodeToken.role;
    console.log('este es el rol ',AppComponent.rol);
  }

  get Role(){
    console.log('este es el rol desde return', AppComponent.rol);
    return AppComponent.rol;
  }
  
  Activar():void{
    this.bandera=true;
  }
}




