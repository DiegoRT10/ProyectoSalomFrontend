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

  //Obtener un usuario
  getOneUser(user:any){
    return this.http.post<Users[]>(`${this.URL}/user/oneuser`,user);
  }

  //Agregar un usuario
  addUser(user:any){
    return this.http.post(`${this.URL}/user/create`,user);
  }

  //Editar un usuario
  editUser(user:any){
    return this.http.put(`${this.URL}/user/update`,user);
  }
  
  //Editar un usuario con datos de nomina
  editUserNomina(user:any){
    return this.http.put(`${this.URL}/user/updateNomina`,user);
  }

 //Eliminar un usuario
 deleteUser(user:any){
  return this.http.put(`${this.URL}/user/delete`,user);
 }

 uploadFile(file:any){
  return this.http.post(`${this.URL}/file/upload`,file);
 }
  
  }

  export interface Users{
   
      id:String,
      name?:String,
      apppassword?:String,
      card?:Number,
      role?:any,
      visible?:any,
      image?:any,
      auditor?:any,
      token?:String | null,
      tokenLife?:String | null
   
  }

  export interface Users2{
   
    id:String,
    name?:String,
    apppassword?:String,
    card?:Number,
    role?:Number,
    visible?:any,
    image?:any,
    auditor?:Number,
    token?:String | null,
    tokenLife?:String | null
 
}

