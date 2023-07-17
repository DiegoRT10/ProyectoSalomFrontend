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

  ListCoordenada(){
    return this.http.get(`${this.URL}/direccion/coordenadasReceive`);
  }
}

export interface Coordenada{
  latitud:string,
  longitud:string,
  id:string
}

export interface ID{
  id:string
}