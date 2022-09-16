import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CrudService {

  constructor(private http: HttpClient,
    private jwtHelper: JwtHelperService) { }


    private URL = 'http://localhost:3000';

  //Listar todos los usuarios  
  getUser(){
    return this.http.get(`${this.URL}/user/`);
  } 

  //Agregar un usuario
  addUser(user:any){
    return this.http.post(`${this.URL}/user/create`,user);
  }

  //Editar un usuario
  editUser(user:any){
    return this.http.post(`${this.URL}/user/update`,user);
  }

 //Eliminar un usuario
 deleteUser(user:any){
  return this.http.post(`${this.URL}/user/delete`,user);
 }

  
  }

  export interface Users{
   
      id?:String,
      name?:String,
      apppassword?:String,
      card?:Number,
      role?:Number,
      visible?:any,
      image?:String,
      auditor?:Number,
      token?:String,
      tokenLife?:String
   
  }

