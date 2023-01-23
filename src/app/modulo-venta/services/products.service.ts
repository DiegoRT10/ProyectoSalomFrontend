import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private http: HttpClient,
    private jwtHelper: JwtHelperService) { }


    private URL = 'http://localhost:3000';
    
       //Listar todos los productos   
       getPriducts(){
        return this.http.get(`${this.URL}/producto/products`);
      } 


        //Listar vista productos 
      getViewsProducts(){
        return this.http.get(`${this.URL}/producto/ViewProducts`);
      } 


        //Listar vista productos 
        getViewsProductsCodeName(){
          return this.http.get(`${this.URL}/producto/ViewProductsCodeName`);
        } 

         //Listar vista productos 
         getLocationsId(){
          return this.http.get(`${this.URL}/producto/ViewLocationsId`);
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

export interface ViewProducts2{
  code_name:string
}

export interface LocationsId{
  id:string
}