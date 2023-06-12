import { HttpInterceptor } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor{

  intercept(req:any, next:any){
    const token = localStorage.getItem('token');
    const tokenHeader = req.clone({
      setHeaders:{
        Authorization: `Bearer ${token}`
      }
    });
    return next.handle(tokenHeader);
  }

  constructor() { }
}

      //como crear un servisio en angular
      //ng g s services/token-interceptor.service

  
