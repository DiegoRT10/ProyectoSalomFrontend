import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CrudLocationService {

  constructor(private http: HttpClient,
    private jwtHelper: JwtHelperService) { }

    private URL = 'http://localhost:3000';


    //Listar todos   
    getLocations(){
      return this.http.get(`${this.URL}/location/`);
    } 
    
    //Obtener un puesto
    getOneLocation(etapa:any){
      return this.http.post<Locations[]>(`${this.URL}/location/onelocation`,etapa);
    }
    
    //Agregar un puesto
    addLocation(etapa:any){
      return this.http.post(`${this.URL}/location/create`,etapa);
    }
    
    //Editar un puesto
    editLocation(etapa:any){
      return this.http.put(`${this.URL}/location/update`,etapa);
    }
    
    delLocation(id:any){
      console.log('este es el id desde el service '+id);
      return this.http.delete(`${this.URL}/location/delete${id}`);
    }
    }
    export interface Locations{
    id:String,
    name:String,
    address:String,
    latitud:String,
    longitud:String
    }
