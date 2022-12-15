import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class VentaDiariaService {

  constructor(private http: HttpClient,
    private jwtHelper: JwtHelperService) { }


    private URL = 'http://localhost:3000';


    //Listar todos   
    getVenta(){
      return this.http.get(`${this.URL}/venta/`);
    } 
    
    //Obtener consulta de venta del dia
    getOneVenta(venta:any){
      console.log('entre a getOneVenta');
      return this.http.post<VentaDiaria[]>(`${this.URL}/venta/`,venta);
    }

    getMetas(){
      return this.http.get(`${this.URL}/venta/metafarmacia`);
    }
}

export interface VentaDiaria{
  dia:String,
  host:String,
  total:number
  }

  export interface VentaMes{
    mes:string
  }
  
  export interface MetaFarmacia{
    idlocation:string,
    monto:number,
    datenew:Date,
    dateend:Date
  }
  

