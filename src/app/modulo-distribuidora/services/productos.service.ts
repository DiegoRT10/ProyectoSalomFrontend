import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {
  private URL = environment.PORT;
  
  constructor(private http: HttpClient, private jwtHelper: JwtHelperService) { }

  ListProductoCatalogo(){
    return this.http.get(`${this.URL}/distribuidora/productosCatalogo`);
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

export interface ProductoCatalogo{
  id:string,
  reference:string,
  pormayor: number,
  name: string,
  forma: string,
  concentracion: string,
  presentacion: string,
  laboratorio: string, 
}