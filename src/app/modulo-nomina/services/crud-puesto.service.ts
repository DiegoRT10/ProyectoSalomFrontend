import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CrudPuestoService {

  constructor(private http: HttpClient,
    private jwtHelper: JwtHelperService) { }

    private URL = 'http://localhost:3000';

    //Listar todos los puestos  
  getPuesto(){
    return this.http.get(`${this.URL}/puesto/`);
  } 

  //Agregar un puesto
  addPuesto(puesto:any){
    return this.http.post(`${this.URL}/puesto/create`,puesto);
  }

}
export interface Puestos{
   
  id:String,
  nombre?:String,
  descripcion?:String,
  depto?:Number,
  salarioMin?:any,
  salarioMax?:any,
}
