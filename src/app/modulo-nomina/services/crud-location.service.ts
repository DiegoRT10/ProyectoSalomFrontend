import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CrudLocationService {

  constructor(private http: HttpClient,
    private jwtHelper: JwtHelperService) { }

    //private URL = 'http://localhost:3000';
    private URL = environment.PORT;

    //Listar todos   
    getLocations(){
      return this.http.get(`${this.URL}/location/`);
    } 

    //Lista IDs de las locaciones
    getLocationsID(){
      return this.http.get(`${this.URL}/location/LocationsID`);
    } 
    
    //Obtener un puesto
    getOneLocation(location:any){
      return this.http.post<Locations[]>(`${this.URL}/location/onelocation`,location);
    }
    
    //Agregar un puesto
    addLocation(location:any){
      return this.http.post(`${this.URL}/location/create`,location);
    }
    
    //Editar un puesto
    editLocation(location:any){
      return this.http.put(`${this.URL}/location/update`,location);
    }
    
    delLocation(location:any){
      return this.http.put(`${this.URL}/location/delete`,location);
    }

    }
    export interface Locations{
    id:String,
    name:String,
    address:String,
    latitud:String,
    longitud:String,
    visible:String
    }

    export interface LIDs{
      id:String
    }