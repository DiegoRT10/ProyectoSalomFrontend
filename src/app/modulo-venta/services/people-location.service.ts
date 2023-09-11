import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PeopleLocationService {

  constructor(private http: HttpClient,
    private jwtHelper: JwtHelperService) { }


    //private URL = 'http://localhost:3000';
    private URL = environment.PORT;
    
       //Listar todos los productos   
       getPeopleLocation(){
        return this.http.get(`${this.URL}/location/peoplelocation`);
      } 



}

  export interface PeopleLocationMeta{
    id:string,
    name: string,
    idlocation: string
  }

  export interface PeopleRank{
    id:string,
    name: string,
    idlocation: string,
    puesto: number,
    meta: number,
    actual: number
  }

  export interface customColors {
    name: string,
    value: string
  }