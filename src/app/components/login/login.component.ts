import { RoleGuard } from './../../guards/role.guard';
import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import decode from 'jwt-decode';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user = {
    username: '',
    pass: ''
  }

  bandera?:boolean;
  carga?: boolean;

  constructor( private authService: AuthService, private router: Router, private roleGuard: RoleGuard ) { 
    this.bandera = false;
  }

  ngOnInit(): void {
    this.carga = true;
  }

  ngAfterViewInit() {
    this.carga = false;
  }

  Login(){
   
    this.authService.singin(this.user).subscribe((res:any) =>{
    
    if(res.token ){
    localStorage.setItem('token',res.token);
    const token = localStorage.getItem('token');
    let decodeToken:any = {}
    decodeToken = decode(token || '');
    console.log(decodeToken.role);
    localStorage.setItem('rol',decodeToken.role);

      switch(decodeToken.role){
        case '0': this.router.navigate(['home-sistemas']);
        break;
        case '1' : this.router.navigate(['home-gerente']);
        break;
        case '2' : this.router.navigate(['home-administrador']);
        break;
        case '3' : this.router.navigate(['invitado']);
      }
      AppComponent.verificarRol();
    } else{
      this.bandera = true;
    } 
    
    });
  }

  cerrar():void{
    this.bandera = false;
  }

}
