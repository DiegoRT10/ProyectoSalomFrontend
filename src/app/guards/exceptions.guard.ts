import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import decode from 'jwt-decode';
@Injectable({
  providedIn: 'root'
})
export class ExceptionsGuard implements CanActivate {
  constructor( private authService: AuthService, public router: Router){
  }
  //Verifica si el rol es el indicado para acceder 
  canActivate(route: ActivatedRouteSnapshot):boolean{
    const expectedRole = route.data['expectedRole'].s;//sistemas
    const expectedRole2 = route.data['expectedRole'].g;//gerente
    const token = localStorage.getItem('token');
    let decodeToken:any = {}
    decodeToken = decode(token || '');
  
    if(!this.authService.isAuth() || decodeToken.role !== expectedRole && decodeToken.role !== expectedRole2){
      console.log('Usuario no autorizado para la vista');
      this.router.navigate(['login']);//retorna a login si no lo es
      return false;
    }
   
    return true;
  }
  
}
