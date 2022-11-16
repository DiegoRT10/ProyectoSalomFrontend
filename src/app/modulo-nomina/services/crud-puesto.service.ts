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

  //Obtener un puesto
  getOnePuesto(puesto:any){
    return this.http.post<Puestos[]>(`${this.URL}/puesto/onepuesto`,puesto);
  }

  //Agregar un puesto
  addPuesto(puesto:any){
    return this.http.post(`${this.URL}/puesto/create`,puesto);
  }

  //Editar un puesto
  editPuesto(puesto:any){
    return this.http.put(`${this.URL}/puesto/update`,puesto);
  }

  delPuesto(id:any){
    console.log('este es el id desde el service '+id);
    return this.http.delete(`${this.URL}/puesto/delete${id}`);
  }
}
export interface Puestos{
   
  id:String,
  nombre?:String,
  descripcion?:String,
  depto?:Number,
  salario_min?:any,
  salario_max?:any,
}
