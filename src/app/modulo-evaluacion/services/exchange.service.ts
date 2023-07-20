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

      editEvaluacion(data:Evaluacion){
        return this.http.put(`${this.URL}/evaluacion/update-evaluacion`,data);
      }

      setProductosEvaluacion(data:ProductosEvaluacion){
        return this.http.post(`${this.URL}/evaluacion/insert_productos_evaluacion`,data);
      }

      editProductosEvaluacion(data:ProductosEvaluacion){
        return this.http.put(`${this.URL}/evaluacion/update_productos_evaluacion`,data);
      }
      
      ListEvaluacion(data:ID){
        return this.http.post<Evaluacion[]>(`${this.URL}/evaluacion/list-evaluacion`,data);
      }

      ListEvaluacionEnd(data:ID){
        return this.http.post<Evaluacion[]>(`${this.URL}/evaluacion/list-evaluacion-end`,data);
      }

      ListProductosEvaluacion(data:ID){
        return this.http.post<ProductosEvaluacion[]>(`${this.URL}/evaluacion/list-producto-evaluacion`,data);
      }

      ListPreguntasEvaluacion(data:ID){
        return this.http.post<ProductosEvaluacion[]>(`${this.URL}/evaluacion/list-evaluacion-preguntas`,data);
      }

      ListProductosDiagnostica(){
        return this.http.get(`${this.URL}/evaluacion/ProductoDiagnostica`);
      }

      editProductosDiagnostica(data:Evaluado){
        return this.http.put(`${this.URL}/evaluacion/UpdateProductoDiagnostica`,data);
      }

      resetProductosDiagnostica(data:any){
        console.log('dato para resetear ',data);
        return this.http.put(`${this.URL}/evaluacion/resetProductosDiagnostica`,data);
      }

      //------------------------------------------------------------------------------------
      CantidadProductoDiagnostica(){
        return this.http.get<CountProductoEvaluacion[]>(`${this.URL}/evaluacion/cantidad-producto-diagnostica`);
      }

      CantidadProductoCalificadoDiagnostica(){
        return this.http.get<CountProductoCalificacion[]>(`${this.URL}/evaluacion/cantidad-producto-calificado-diagnostica`);
      }

      CantidadProductoFinal(){
        return this.http.get<CountProductoEvaluacion[]>(`${this.URL}/evaluacion/cantidad-producto-final`);
      }

      CantidadProductoCalificadoFinal(){
        return this.http.get<CountProductoCalificacion[]>(`${this.URL}/evaluacion/cantidad-producto-calificado-final`);
      }

      ListProductosCalificados(data:ID){
        return this.http.post(`${this.URL}/evaluacion/ProductosCalificados`,data);
      }

    }

    export interface ProductosCalificados{
      nombre:string,
      pregunta:number,
      calificacion:number
    }

    export interface DatoEvaluado{
      evaluado:number
    }

  
    export interface CountProductoEvaluacion{
      NoEvaluado: number
    }

    export interface CountProductoCalificacion{
      NoCalificado: number
    }

    export interface ID{
      id: string;
    }

    export interface Evaluado{
      id:string,
      evaluado:string
    }

    export interface Evaluacion{
      id:string,
      tipo:string,
      nombre:string,
      puesto:string,
      observacion:string,
      estado:string
    }

    export interface ProductosEvaluacion{
      id:string,
      id_evaluacion:string,
      id_producto:string,
      pregunta:string,
      calificacion:string
    }

    export interface ProductoDiagnostica{
      id:string, 
      reference:string,
      nombre:string, 
      evaluacion:string, 
      evaluado:string, 
      componente:string, 
      indicacion:string
    }
    