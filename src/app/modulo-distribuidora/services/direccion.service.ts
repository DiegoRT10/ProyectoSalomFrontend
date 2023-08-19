import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DireccionService {
  private URL = environment.PORT;
  
  constructor(private http: HttpClient, private jwtHelper: JwtHelperService) { }

  ListCoordenada(idPeople:ID){
    console.log('este es el idPeople a enivar ', idPeople);
    return this.http.post<Coordenada>(`${this.URL}/distribuidora/coordenadasReceive`,idPeople);
  }
}

export interface Coordenada{
  id:string,
  idRuta:string,
  idPeople:string
  fechaHora:string;
  latitud:string,
  longitud:string,
}

export interface ID{
  idPeople:string
}