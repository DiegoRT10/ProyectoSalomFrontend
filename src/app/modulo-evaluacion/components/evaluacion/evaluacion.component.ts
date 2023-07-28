import { Component, OnInit, ViewChild } from '@angular/core';
import { ProductsService, ViewProducts2 } from 'src/app/modulo-venta/services/products.service';
import { ExchangeService, ID, ProductosEvaluacion, Evaluacion } from '../../services/exchange.service';
import { Router } from '@angular/router';
import { NgbTypeahead } from '@ng-bootstrap/ng-bootstrap';
import { Observable, OperatorFunction, Subject, debounceTime, distinctUntilChanged, filter, map, merge } from 'rxjs';

@Component({
  selector: 'app-evaluacion',
  templateUrl: './evaluacion.component.html',
  styleUrls: ['./evaluacion.component.css']
})
export class EvaluacionComponent implements OnInit {
  model!: string;
  product = [''];
  listaOp: String[] = ['Evaluacion Diagnostica', 'Evaluacion Final'];
  ListaProductsCodeName?:ViewProducts2[];
  filtroPregunta?: string;

  ObjEvaluacion: Evaluacion = {
    id: '',
    tipo: '',
    nombre: '',
    puesto: '',
    observacion: '',
    estado: ''
  }

  ObjProductosEvalucion: ProductosEvaluacion = {
    id: '',
    id_evaluacion: '',
    id_producto: '',
    pregunta: '',
    calificacion: ''
  }

  

  ObjId: ID = {
    id: ''
  }


  constructor(private router: Router, private exchangeService: ExchangeService, private products:ProductsService){

  }



  ngOnInit(): void {
    this.getProductsCodeName();
  }

  @ViewChild('instance', { static: true }) instance: NgbTypeahead | undefined;
	focus$ = new Subject<string>();
	click$ = new Subject<string>();

	search: OperatorFunction<string, readonly string[]> = (text$: Observable<string>) => {
		const debouncedText$ = text$.pipe(debounceTime(200), distinctUntilChanged());
		const clicksWithClosedPopup$ = this.click$.pipe(filter(() => this.instance!.isPopupOpen()));
		const inputFocus$ = this.focus$;
   
    
		return merge(debouncedText$, inputFocus$, clicksWithClosedPopup$).pipe(
			map((term) =>
				(term === '' ? this.product : this.product.filter((v) => v.toLowerCase().indexOf(term.toLowerCase()) > -1)).slice(0, 10),
			),
		);
	};



  getProductsCodeName(): void {
    this.products.getViewsProductsCodeName().subscribe(res => {
      this.ListaProductsCodeName = <any>res;
      
      for (const i of this.ListaProductsCodeName!) {
        this.product.push( <any>i.code_name);
         
      }
      
    },
      err => {
        console.log(err);
      }

    );
  }


  getProducto():string {
    for (let i = 0; i < this.model.length; i++) {
      let ascii = this.model.toUpperCase().charCodeAt(i);
      
      if(!(ascii > 64 && ascii < 91)){
       if(!(this.model.charAt(i) == ' ')){
        this.ObjProductosEvalucion.id_producto += this.model.charAt(i); 
       }else{break;}
      }else{break;}
    }

    return <any>this.ListaProductsCodeName?.find(element => element.code == <any>this.ObjProductosEvalucion.id_producto)?.id;
   
   
    
  }



  setDatosEvaluacion(){
    if(this.VerificaVacio()){

      switch (<any>this.ObjEvaluacion.tipo) {
        case 'Evaluacion Diagnostica': this.ObjEvaluacion.tipo = '0';
          break;
        case 'Evaluacion Final': this.ObjEvaluacion.tipo = '1';
          break;
      }
  
      this.ObjEvaluacion.estado = '0' //creacion de evaluacion  
  
  
  
      this.exchangeService.setEvaluacion(this.ObjEvaluacion).subscribe(res => {
       
        
      
        localStorage.setItem('code-name',this.model);
        localStorage.setItem('idEvaluacion',<any>res);
        localStorage.setItem('tipoEvaluacion',this.ObjEvaluacion.tipo);
        localStorage.setItem('personaEvaluando',this.ObjEvaluacion.nombre);

  
        this.ObjProductosEvalucion.id = "";
        this.ObjProductosEvalucion.id_evaluacion = "";
        this.ObjProductosEvalucion.id_producto = "";
        this.ObjProductosEvalucion.pregunta = "";
        this.ObjProductosEvalucion.calificacion = "";
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