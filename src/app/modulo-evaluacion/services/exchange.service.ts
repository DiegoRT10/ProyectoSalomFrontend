import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ExchangeService {

  constructor(private http: HttpClient,
    private jwtHelper: JwtHelperService) { }


    //private URL = 'http://localhost:3000';
    private URL = environment.PORT;
    
       //Listar todos los productos   
       getProducto(){
        return this.http.get(`${this.URL}/evaluacion/sendData`);
      } 

      setEvaluacion(data:evaluacion){
        return this.http.post(`${this.URL}/evaluacion/sendData`,data);
      }

      setProductosEvaluacion(data:evaluacion){
        return this.http.post(`${this.URL}/evaluacion/sendData`,data);
      }

      
    }

    export interface ID{
      id: number;
    }

    export interface evaluacion{
      id:string,
      tipo:string,
      nombre:string,
      puesto:string,
      observacion:string
    }

    export interface productos_evaluacion{
      id:string,
      id_evaluacion:string,
      id_producto:string,
      pregunta:string,
      respuesta:string
    }