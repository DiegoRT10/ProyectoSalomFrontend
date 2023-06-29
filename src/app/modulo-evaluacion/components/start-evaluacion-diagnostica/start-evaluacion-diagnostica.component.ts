import { Component, OnInit, ViewChild } from '@angular/core';
import { ExchangeService, ID, ProductosEvaluacion, Evaluacion } from '../../services/exchange.service';
import { Router } from '@angular/router';
import { ProductsService, ViewProducts2 } from 'src/app/modulo-venta/services/products.service';
import { NgbTypeahead } from '@ng-bootstrap/ng-bootstrap';
import { Observable, OperatorFunction, Subject, debounceTime, distinctUntilChanged, filter, map, merge } from 'rxjs';

@Component({
  selector: 'app-start-evaluacion-diagnostica',
  templateUrl: './start-evaluacion-diagnostica.component.html',
  styleUrls: ['./start-evaluacion-diagnostica.component.css']
})
export class StartEvaluacionDiagnosticaComponent implements OnInit{

  model: string ='';
  product = [''];
  flag:boolean=false;
  flagProducto:boolean = false;
  NoPregunta:number=0;

  ListaProductsCodeName?:ViewProducts2[];
  ListEvaluacion?:Evaluacion[];
  ListProductosEvaluacion?:ProductosEvaluacion[];

  ObjId: ID = {
    id: ''
  }


  ObjEvaluacion:Evaluacion ={
    id: '',
    tipo: '',
    nombre: '',
    puesto: '',
    observacion: ''
  };

  ObjProductosEvaluacion:ProductosEvaluacion ={
    id: '',
    id_evaluacion: '',
    id_producto: '',
    pregunta: '',
    calificacion: ''
  }

  ObjProductosEvaluacionNew:ProductosEvaluacion ={
    id: '',
    id_evaluacion: '',
    id_producto: '',
    pregunta: '',
    calificacion: ''
  }

  ObjProductoCodeName:ViewProducts2 = {
    id: '',
    code: '',
    nombre: '',
    code_name: ''
  }

  constructor(private router: Router, private exchangeService: ExchangeService, private products:ProductsService){
    
  }

  ngOnInit(): void {
    
    

    this.ListarEvaluacion(<any>localStorage.getItem('idEvaluacion'));
   
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
      this.setDatosProductos(<any>localStorage.getItem('idProducto'));
    },
      err => {
        console.log(err);
      }

    );
  }



  ListarEvaluacion(id:string){
    this.ObjId.id = id;
    console.log('este es el dato a enviar ',this.ObjId.id);
    this.exchangeService.ListEvaluacion(this.ObjId).subscribe(res => {
      this.ObjEvaluacion = res[0];
      this.getProductsCodeName();
      
    },
      err => {
        console.log(err);
      }

    );
  }

  ListarProductosEvaluacion(id:string):void{
    this.ObjId.id = id;
    console.log('este es el dato a enviar ',this.ObjId.id);
    this.exchangeService.ListProductosEvaluacion(this.ObjId).subscribe(res => {
      this.ObjProductosEvaluacionNew = res[0];

      console.log('datos recibido producto ',this.ObjProductosEvaluacionNew.pregunta);
    },
      err => {
        console.log(err);
      }

    );

  }


  setDatosProductos(id:string):void{
    
    for (const i of this.ListaProductsCodeName!) {
      if(i.id == id){
        
        this.ObjProductoCodeName.code = i.code;
        this.ObjProductoCodeName.nombre = i.nombre;
      }
      
    }
  }

  setDatosProductosEvaluacion(calificacion:string){
    this.ObjProductosEvaluacion.calificacion = calificacion;
      console.log('Datos a enviar2',this.ObjProductosEvaluacion);

      this.exchangeService.setProductosEvaluacion(this.ObjProductosEvaluacion).subscribe(res => {
        this.model = "";
        this.ObjProductosEvaluacion.id_evaluacion = "";
        this.ObjProductosEvaluacion.id_producto = "";
        this.ObjProductosEvaluacion.pregunta = "";
        this.ObjProductosEvaluacion.calificacion = "";
        this.ObjProductosEvaluacionNew.pregunta = ""
        // this.ListarProductosEvaluacion(<any>localStorage.getItem('idEvaluacion'));
        
      },
        err => {
          console.log(err);
        }
  
      );
   }


   
  getProducto():string {
    this.ObjProductosEvaluacion.id_producto="";
    for (let i = 0; i < this.model.length; i++) {
      let ascii = this.model.toUpperCase().charCodeAt(i);
      
      if(!(ascii > 64 && ascii < 91)){
       if(!(this.model.charAt(i) == ' ')){
        this.ObjProductosEvaluacion.id_producto += this.model.charAt(i); 
       }else{break;}
      }else{break;}
    }
    
    return <any>this.ListaProductsCodeName?.find(element => element.code == <any>this.ObjProductosEvaluacion.id_producto)?.id;
    
  }


   newQuestion():void{
    
    if(this.getProducto()  !== undefined ){
      this.ObjProductosEvaluacion.id_evaluacion = <any>localStorage.getItem('idEvaluacion');
      this.ObjProductosEvaluacion.id_producto = this.getProducto();
      

      this.ObjId.id = <any>localStorage.getItem('idEvaluacion');
      console.log('este es el dato a enviar ',this.ObjId.id);
      this.exchangeService.ListProductosEvaluacion(this.ObjId).subscribe(res => {
      this.ObjProductosEvaluacionNew = res[0];

      console.log('datos recibido producto ',this.ObjProductosEvaluacionNew.pregunta);

      if(this.ObjProductosEvaluacionNew.pregunta != null){
        console.log("entre al if");
        this.NoPregunta = Number(this.ObjProductosEvaluacionNew.pregunta) + 1;
        this.ObjProductosEvaluacion.pregunta = String(this.NoPregunta);
      }else{this.ObjProductosEvaluacion.pregunta = '1'}

    },
      err => {
        console.log(err);
      }

    );

     

      
      
      console.log('Datos a enviar',this.ObjProductosEvaluacion);
      
    }else{
      alert('Error seleciona un producto');
    }

  
   }

}
