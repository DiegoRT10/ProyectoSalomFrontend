import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private http: HttpClient,
    private jwtHelper: JwtHelperService) { }


    //private URL = 'http://localhost:3000';
    private URL = environment.PORT;
    
       //Listar todos los productos   
       getPriducts(){
        return this.http.get(`${this.URL}/producto/products`);
      } 


        //Listar vista productos 
      getViewsProducts(){
        return this.http.get(`${this.URL}/producto/ViewProducts`);
      } 


      //listar visat de productos y productos
      getProductosView(){
        console.log('entre a view products ');
        return this.http.get(`${this.URL}/producto/ProductsView`);
      }


        //Listar vista productos 
        getViewsProductsCodeName(){
          return this.http.get(`${this.URL}/producto/ViewProductsCodeName`);
        } 

         //Listar vista productos 
         getLocationsId(){
          return this.http.get(`${this.URL}/producto/ViewLocationsId`);
        } 

        searchProductoCode(code:any){
          return this.http.post<productsViewProducts[]>(`${this.URL}/producto/SearchProductsViewProducts`,code);
        }

        getInventarioFarmacia(id:any){
          return this.http.post<Inventario[]>(`${this.URL}/producto/inventarioFarmacia`,id);
        }

        searchPriceSell(id:any){
          return this.http.post<PriceSell[]>(`${this.URL}/producto/PriceSell`,id);
        }
}

export interface Products{
  id:string,
  reference:string,
  code:string,
  codetype:string,
  name:string,
  pricebuy:number,
  pricesell:number,
  category:string,
  taxcat:number,
  attributeset_id:string,
  stockcost:number,
  stockvolumen:number,
  image:Blob,
  iscom:any,
  isscale:any,
  isconstant:any,
  printkb:any,
  sendstatus:any 
  isservice:any 
  attributes:Blob 
  display:string 
  isvprice:number 
  isverpatrib:number 
  texttip:string 
  warranty:number 
  stockunits:number 
  printto:string 
  supplier:string 
  uom:string 
  memodate:any //data time 
  concentracion:string 
  forma:string 
  codigopf:string 
  updated:any //data time 
  bono:number 
  visible:number

}

export interface ViewProducts{
  id:string,
  codigopf:string,
  bono:number,
  codin:string,
  nombre:string,
  uom:string,
  costo:number,
  precio:number,
  margen:number,
  supplier:string,
}

export interface productsViewProducts{
    code: string,
    id: string,
    codigopf: string,
    bono: number,
    codin: string,
    nombre: string,
    uom: string,
    costo: number,
    precio: number,
    margen: number,
    supplier: string,
    taxcat: string,
    visible: number
}

export interface Inventario{
  id:string,
  code:string,
  nombre:string,
  units:number
}


export interface ViewProducts2{
  id:string,
  code:string,
  reference:string,
  nombre:string,
  code_name:string
}

export interface LocationsId{
  id:string
}

export interface Movimientos{
  idProducto:string,
  idLocation:string,
  cantidad:number
}

export interface Movimientos2{
  idProducto?:string,
  idLocation?:string,
  cantidad?:number
}

export interface ProductoCode{
  code:string
}

export interface ProductoId{
  id:string  
}

export interface PriceSell{
  id:string,
  pricesell:number
}
