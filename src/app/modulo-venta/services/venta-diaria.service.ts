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

    //Obtener consulta de venta del dia
    getDatos(venta:any){
      console.log('entre a getOneVenta');
      return this.http.post<VentaDiaria[]>(`${this.URL}/venta/DataGarfica`,venta);
    }

     //Obtener consulta de venta del dia
     getOneMeta(venta:any){
      console.log('entre a getOneMeta',venta);
      return this.http.post<MetaFarmacia[]>(`${this.URL}/venta/onemetafarmacia`,venta);
    }

    getPeopleLocation(venta:any){
      console.log('entre a getOneMeta',venta);
      return this.http.post<PeopleLocation[]>(`${this.URL}/venta/peoplelocation`,venta);
    }

    
    
}

export interface VentaDiaria{
  dia:number,
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
  

  export interface DatosGrafica{
    name:String,
    value:number
  }

  export interface Farmacia{
    id: string
  }

  export interface PeopleLocation{
    id:string,
    name:string,
    apppassword:string,
    card:number,
    role:number,
    visible:any,
    image:any,
    auditor:number,
    token:string | null,
    tokenLife?:string | null
    idpeople: string,
    idlocation: string,
    meta: number,
    nivel: number,
    dia: number
  }