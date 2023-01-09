import { Observable } from 'rxjs';
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
      return this.http.post<DataVentaDiaria[]>(`${this.URL}/venta/`,venta);
    }

    getMetas(){
      return this.http.get(`${this.URL}/venta/metafarmacia`);
    }

    //Obtener consulta de venta del dia
    getDatos(venta:any){
      return this.http.post<DataVentaDiaria[]>(`${this.URL}/venta/DataGarfica`,venta);
    }

     //Obtener consulta de venta del dia
     getOneMeta(venta:any){
      return this.http.post<MetaFarmacia[]>(`${this.URL}/venta/onemetafarmacia`,venta);
    }

    getPeopleLocation(venta:any){
      return this.http.post<PeopleLocation[]>(`${this.URL}/venta/peoplelocation`,venta);
    }

     //Obtener consulta de venta del dia
     getVentaDia(venta:any){
      return this.http.post<VentaPorDia[]>(`${this.URL}/venta/ventapordia`,venta);
    }

    //Obtener consulta de cierres
    getCierres(venta:any){
      return this.http.post<Cierres[]>(`${this.URL}/venta/cierres`,venta);
    }

    getDepositos (money:any): Observable<Depositos[]>{
      return this.http.post<Depositos[]>(`${this.URL}/venta/deposito`,money);
    }
  
  getTransacciones (money:any): Observable<Depositos[]>{
    return this.http.post<Depositos[]>(`${this.URL}/venta/transacciones`,money);
  }

  putDepositos(data:any,){
    return this.http.put(`${this.URL}/venta/depositoCambio`,data);
  }

  getEstimulos(ym:any){
    return this.http.post<Estimulos[]>(`${this.URL}/venta/estimulos`,ym);
  }

  getVentaSucursal(data:any){
    return this.http.post<Estimulos[]>(`${this.URL}/venta/ventaSucursal`,data);
  }

  getOnPeople(data:any){
    return this.http.post<PeopleLocation2[]>(`${this.URL}/venta/onePeopleLocation`,data);
  }

  getVentaDiaria(data:any){
    return this.http.post<VentaDiariaAdmin[]>(`${this.URL}/venta/ventaDiaria`,data);
  }

  getCierresAdmin(data:any){
    return this.http.post<Cierres[]>(`${this.URL}/venta/CierresAdministrador`,data);
  }

}

export interface DataVentaDiaria{
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

  export interface Administrador{
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

  export interface VentaPorDia{
    dia:number,
    titular:number 
  }

  export interface dataVenta{
    host:string,
    ym:string,
    pay:string
  }

  export interface dataCierres{
    host:string,
    ym:string,
  }

  export interface dataDepositos{
    money:string
  }

  export interface YM{
    ym:string
  }

  export interface Cierres{
    money:string,
    seq:number,
    dia:number,
    dateend:Date,
    venta:number,
    apertura:number,
    cierre:number,
    gastos:number,
    ingresos:number,

    // id:number, 
    // numero:number, 
    // moneyId:string,  
    // monto:number,
    // fecha:Date,
    // estado:number
    // total:number
  }

  export interface Depositos{
    id:number, 
    numero:number, 
    money:string, 
    monto:number,
    fecha:Date, 
    estado:number
  }

  export interface Estimulos{
    name:string,
    pe:string,
    total:number
  }

  export interface VentaSucursal{
    pid:string,
    pname:string,
    venta:number,
    meta:number,
    meta_farm:number,
    idlocation:string
  }

  export interface PeopleLocation2{
    idpeolple:string;
    idlocation:string;
    meta:number;
    nivel:number;
    dia:number
  }

  export interface VentaDiariaAdmin{
    dia:number;
    titular:number;
    apoyo:number;
  }

 