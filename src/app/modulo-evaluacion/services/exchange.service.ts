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

      setEvaluacion(data:Evaluacion){
        return this.http.post(`${this.URL}/evaluacion`,data);
      }

      setProductosEvaluacion(data:ProductosEvaluacion){
        return this.http.post(`${this.URL}/evaluacion/insert_productos_evaluacion`,data);
      }
      
      ListEvaluacion(data:ID){
        return this.http.post<Evaluacion[]>(`${this.URL}/evaluacion/list-evaluacion`,data);
      }

      ListProductosEvaluacion(data:ID){
        return this.http.post<ProductosEvaluacion[]>(`${this.URL}/evaluacion/list-producto-evaluacion`,data);
      }

    }

    export interface ID{
      id: string;
    }

    

    export interface Evaluacion{
      id:string,
      tipo:string,
      nombre:string,
      puesto:string,
      observacion:string
    }

    export interface ProductosEvaluacion{
      id:string,
      id_evaluacion:string,
      id_producto:string,
      pregunta:string,
      calificacion:string
    }

    