import { Component, OnInit } from '@angular/core';
import { Evaluacion, ExchangeService, ID } from '../../services/exchange.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-evaluacion-bodega',
  templateUrl: './evaluacion-bodega.component.html',
  styleUrls: ['./evaluacion-bodega.component.css']
})
export class EvaluacionBodegaComponent implements OnInit{
  model!: string;
  product = [''];
  listaOp: String[] = ['Evaluacion Diagnostica', 'Evaluacion Final'];

  filtroPregunta?: string;

  ObjEvaluacion: Evaluacion = {
    id: '',
    tipo: '',
    nombre: '',
    puesto: '',
    observacion: '',
    estado: ''
  }


  ObjId: ID = {
    id: ''
  }


  constructor(private router: Router, private exchangeService: ExchangeService){

  }



  ngOnInit(): void {
    // this.getProductsCodeName();
  }












  setDatosEvaluacion(){
    if(this.VerificaVacio()){

      switch (<any>this.ObjEvaluacion.tipo) {
        case 'Evaluacion Bodega Diagnostica': this.ObjEvaluacion.tipo = '0';
          break;
        case 'Evaluacion Bodega Final': this.ObjEvaluacion.tipo = '1';
          break;
      }
  
      this.ObjEvaluacion.estado = '0' //creacion de evaluacion  
  
  
  
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
