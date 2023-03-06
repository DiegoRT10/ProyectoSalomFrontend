import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TrasladoService {

  private URL = 'http://localhost:3000';

  constructor(private http: HttpClient,
    private jwtHelper: JwtHelperService) { }

    //Agregar Nota de traslado
  addNotaTraslado(notaTraslado:any){
    return this.http.post(`${this.URL}/traslados/createNotaTraslado`,notaTraslado);
  }
  
  
  //agregar detalle de nota de traslado 
 addDetalleNotaTraslado(detalleNotaTraslado:any){
  return this.http.post(`${this.URL}/traslados/createDetalleNotaTraslado`,detalleNotaTraslado);
 }

 searchDetalleTraslado(id:any){
  return this.http.post<DetalleTraslado[]>(`${this.URL}/traslados/detalleTraslado`,id);
}
 
 
}

export interface Traslado {
  id:string, 
  id_entrega:string, 
  id_recibe:string, 
  id_encargado:string, 
  id_autorizado:string, 
  no:number, 
  fecha:Date, 
  id_location_origen:string, 
  id_location_destino:string, 
  motivo:string, 
  estado:string
}

export interface DetalleTraslado{
  id:string,
  id_nota_traslado:string,
  id_producto:string,
  cantidad:number,
  estado:number,
}

export interface IdDetalleTraslado{
  id:string
}