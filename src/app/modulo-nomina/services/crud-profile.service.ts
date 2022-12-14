import { Puestos } from './crud-puesto.service';
import { DecimalPipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class CrudProfileService {

  constructor(private http: HttpClient,
    private jwtHelper: JwtHelperService) { }

    private URL = 'http://localhost:3000';


//Listar todos   
getProfile(){
  return this.http.get(`${this.URL}/profile/`);
} 

//Obtener un puesto
getOneProfile(profile:any){
  return this.http.post<Profiles[]>(`${this.URL}/profile/oneprofile`,profile);
}

//Agregar un puesto
addProfile(profile:any){
  return this.http.post(`${this.URL}/profile/create`,profile);
}

//Editar un puesto
editProfile(profile:any){
  return this.http.put(`${this.URL}/profile/update`,profile);
}

delProfile(id:any){
  console.log('este es el id desde el service '+id);
  return this.http.delete(`${this.URL}/profile/delete${id}`);
}

//Listar todas las locations   
getLocation(){
  return this.http.get(`${this.URL}/profile/locations/`);
} 


//Obtener un usuario con datos de nomina
getProfileNomina(profile:any){
  return this.http.post<ProfileNomina[]>(`${this.URL}/profile/profilenomina`,profile);
}


}
export interface Profiles{
 
  id:String, 
  idLocation:String, 
  salario:Number, 
  idPuesto:String, 
  idEtapa:String, 
  fechaIngreso:Date, 
  fechaFin:Date, 
  fechaPago:Date, 
  estado:String
}

export interface Locations{
 
  id:String, 
  nombre:String, 
  direccion:String
}

export interface ProfileNomina{
  id:String, 
  Location:String, 
  salario:Number, 
  Puesto:String, 
  Etapa:String, 
  fechaIngreso:Date, 
  fechaFin:Date, 
  fechaPago:Date, 
  estado:String
}

