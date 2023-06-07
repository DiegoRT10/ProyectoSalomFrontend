import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CrudEtapaService {

  constructor(private http: HttpClient,
    private jwtHelper: JwtHelperService) { }

    //private URL = 'http://localhost:3000';
    private URL = environment.PORT;
    
//Listar todos   
getEtapa(){
  return this.http.get(`${this.URL}/etapa/`);
} 

//Obtener un puesto
getOneEtapa(etapa:any){
  return this.http.post<Etapas[]>(`${this.URL}/etapa/oneetapa`,etapa);
}

//Agregar un puesto
addEtapa(etapa:any){
  return this.http.post(`${this.URL}/etapa/create`,etapa);
}

//Editar un puesto
editEtapa(etapa:any){
  return this.http.put(`${this.URL}/etapa/update`,etapa);
}

delEtapa(id:any){
  return this.http.delete(`${this.URL}/etapa/delete${id}`);
}
}
export interface Etapas{
 
id:String,
nombre?:String,
descripcion?:String,
}



