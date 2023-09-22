import { Component, OnInit, ViewChild } from '@angular/core';
import { ProductsService, ViewProducts2 } from 'src/app/modulo-venta/services/products.service';
import { ExchangeService, ID, ProductosEvaluacion, Evaluacion } from '../../services/exchange.service';
import { Router } from '@angular/router';
import { NgbTypeahead } from '@ng-bootstrap/ng-bootstrap';
import { Observable, OperatorFunction, Subject, debounceTime, distinctUntilChanged, filter, map, merge } from 'rxjs';
import * as moment from 'moment';

@Component({
  selector: 'app-evaluacion',
  templateUrl: './evaluacion.component.html',
  styleUrls: ['./evaluacion.component.css']
})
export class EvaluacionComponent implements OnInit {
  model!: string;
  product = [''];
  listaOp: String[] = ['Evaluacion Administradores Diagnostica', 'Evaluacion Administradores Final','Evaluacion Bodega Diagnostica','Evaluacion Bodega Final'];

  filtroPregunta?: string;

  ObjEvaluacion: Evaluacion = {
    id: '',
    tipo: '',
    nombre: '',
    puesto: '',
    observacion: '',
    estado: '',
    fecha: ''
  }


  ObjId: ID = {
    id: ''
  }

  date: Date = new Date();

  constructor(private router: Router, private exchangeService: ExchangeService){

  }



  ngOnInit(): void {
    // this.getProductsCodeName();
    console.log('esta es la fecha ', moment.utc(this.date).format('yyyy-MM-DD hh:mm:ss'));
  }












  setDatosEvaluacion(){
    if(this.VerificaVacio()){

      switch (<any>this.ObjEvaluacion.tipo) {
        case 'Evaluacion Administradores Diagnostica': this.ObjEvaluacion.tipo = '0';
          break;
        case 'Evaluacion Administradores Final': this.ObjEvaluacion.tipo = '1';
          break;
        case 'Evaluacion Bodega Diagnostica': this.ObjEvaluacion.tipo = '2';
          break;
        case 'Evaluacion Bodega Final': this.ObjEvaluacion.tipo = '3';
          break;
      }
  
      this.ObjEvaluacion.estado = '0' //creacion de evaluacion  
  
  
      // this.ObjEvaluacion.fecha = 
      this.exchangeService.setEvaluacion(this.ObjEvaluacion).subscribe(res => {
       
        
      
        localStorage.setItem('code-name',this.model);
        localStorage.setItem('idEvaluacion',<any>res);
        localStorage.setItem('tipoEvaluacion',this.ObjEvaluacion.tipo);
        localStorage.setItem('personaEvaluando',this.ObjEvaluacion.nombre);

        this.router.navigate(['start-evaluacion']);
      },
        err => {
          console.log(err);
        }
  
      );

    }else{alert('Faltan campos por llenar')}


    
  }

  

  VerificaVacio():boolean{
    return this.ObjEvaluacion.nombre != '' &&
           this.ObjEvaluacion.tipo != '' &&
           this.ObjEvaluacion.puesto != '' &&
           this.ObjEvaluacion.puesto != ''&&
           this.ObjEvaluacion.observacion != ''
  }


  


  

  
}