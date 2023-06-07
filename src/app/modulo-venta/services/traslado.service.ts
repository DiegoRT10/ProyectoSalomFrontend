import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TrasladoService {

  //private URL = 'http://localhost:3000';
  private URL = environment.PORT;
  

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

// searchDetalleTraslado2(id:any){
//   return this.http.post<Traslado[]>(`${this.URL}/traslados/NotaTraslado`,id);
// }

// searchDetalleTraslado3(id:any){
//   return this.http.post<Traslado[]>(`${this.URL}/traslados/NotaTraslado2`,id);
// }

// searchDetalleTraslado4(id:any){
//   return this.http.post<Traslado[]>(`${this.URL}/traslados/NotaTraslado3`,id);
// }
 
searchDetalleTraslado2(id:any){
  return this.http.post<Traslado_Detalle[]>(`${this.URL}/traslados/NotaTraslado`,id);
}

searchDetalleTraslado3(id:any){
  return this.http.post<Traslado_Detalle[]>(`${this.URL}/traslados/NotaTraslado2`,id);
}

searchDetalleTraslado4(id:any){
  return this.http.post<Traslado_Detalle[]>(`${this.URL}/traslados/NotaTraslado3`,id);
}

searchProductosTraslado(id:any){
  return this.http.post<ProductosTraslado[]>(`${this.URL}/traslados/ProductosTraslado`,id);
}

updateDetalleTraslado(id:any){
    return this.http.put(`${this.URL}/traslados/updateDetalleTraslado`,id);
  }

updateTraslado(id:any){
  return this.http.put(`${this.URL}/traslados/updateTraslado`,id);  
}
 
 //agregar stockdiary 
 addStockDiary(stockdiary:any){
  return this.http.post(`${this.URL}/traslados/stockdiary`,stockdiary);
 }

 updateStockCurrentOrigen(stockCurrent:any){
  return this.http.put(`${this.URL}/traslados/updateStockCurrentOrigen`,stockCurrent);
} 

updateStockCurrentDestino(stockCurrent:any){
  return this.http.put(`${this.URL}/traslados/updateStockCurrentDestino`,stockCurrent);
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
  estado:number
}

export interface DetalleTraslado{
  id:string,
  id_nota_traslado:string,
  id_producto:string,
  cantidad:number,
  estado:number,
}

export interface ProductosTraslado{
  id:string,
  id_nota_traslado:string,
  id_producto:string,
  cantidad:number,
  estado:number,
  codin:number,
  nombre:string
}



export interface Traslado_Detalle {
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
  estado:number,
  
  id_detalle_traslado:string,
  id_nota_traslado:string,
  id_producto:string,
  cantidad:number,
  estado_detalle_traslado:number,
}

export interface IdDetalleTraslado{
  id:string,
  estado:number
}

export interface IdDetalleTraslado1{
  id:string,
  estado:number
}
export interface stockDiary{
  id:string, 
  datenew:Date, 
  reason:string, 
  location:string, 
  product:string, 
  units:number, 
  price:number, 
  appuser:string, 
  supplier:string
}

export interface stockCurrent{
  units:number,
  location:string,
  product:string
}