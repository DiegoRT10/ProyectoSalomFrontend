import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SmsService {

  constructor(private http: HttpClient, private jwtHelper: JwtHelperService) { }


  private URL = environment.PORT;

  //Listar todos los puestos  
sendMessage(data){
  return this.http.post(`${this.URL}/whatsapp/sendMessage`,data);
} 


}

export interface MessageWP{
  number: number, 
  message: string
}
