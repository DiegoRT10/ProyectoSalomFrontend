import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/modulo-venta/services/products.service';
import { ExchangeService, Evaluacion } from '../../services/exchange.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-vista-evaluacion-diagnostica',
  templateUrl: './vista-evaluacion-diagnostica.component.html',
  styleUrls: ['./vista-evaluacion-diagnostica.component.css']
})
export class VistaEvaluacionDiagnosticaComponent implements OnInit {

 
  
 

  constructor(private router: Router, private exchangeService: ExchangeService, private products:ProductsService){

  }

  ngOnInit(): void {
    
  }

  

}
