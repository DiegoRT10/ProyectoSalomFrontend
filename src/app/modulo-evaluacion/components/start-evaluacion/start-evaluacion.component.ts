import { Component, OnInit, ViewChild } from '@angular/core';
import { ExchangeService, ID, ProductosEvaluacion, Evaluacion, ProductoDiagnostica, Evaluado, DatoEvaluado, ProductosCalificados, CountProductoEvaluacion, CountProductoCalificacion, TipoEvaluacion } from '../../services/exchange.service';
import { Router } from '@angular/router';
import { ProductsService, ViewProducts2 } from 'src/app/modulo-venta/services/products.service';
import { NgbTypeahead } from '@ng-bootstrap/ng-bootstrap';
import { Observable, OperatorFunction, Subject, debounceTime, distinctUntilChanged, filter, map, merge } from 'rxjs';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-start-evaluacion',
  templateUrl: './start-evaluacion.component.html',
  styleUrls: ['./start-evaluacion.component.css']
})
export class StartEvaluacionComponent implements OnInit{

  model: string ='';
  product = [''];
  flag:boolean=false;
  flagProducto:boolean = false;
  flagImagen:boolean = false;
  NoPregunta:number=0;
  idItem:string = '';
  idEvaluacion?:string;
  flagEnd:boolean=false;
  URL = environment.PORT;
  PorcentajeAvance:number = 0;
  countExcelente:number=0;
  countRegular:number=0;
  countErroneo:number=0;
  loading = true;

  
  porcentajeExcelente:number=0;
  porcentajeRegular:number=0;
  porcentajeErroneo:number=0;



  ListaProductsCodeName?:ViewProducts2[];
  ListEvaluacion?:Evaluacion[];
  ListProductosEvaluacion?:ProductosEvaluacion[];
  ListPreguntasEvaluacion?:ProductosEvaluacion[];
  ListProductosDiagnostica?:ProductoDiagnostica[];
  ListProductosCalificados?:ProductosCalificados[];
  
  ObjTipoEvaluacion:TipoEvaluacion = {
    tipo: 0
  }

  ObjProductosCalificados: ProductosCalificados = {
    nombre: '',
    name:'',
    calificacion: 0,
    pregunta: 0
  }

  ObjEvaluadoReset: DatoEvaluado = {
    evaluado: 0
  }

  ObjId: ID = {
    id: ''
  }

  ObjIdCalificacion: ID = {
    id: ''
  }


  ObjCountProductoEvaluacion: CountProductoEvaluacion = {
    NoEvaluado: 0
  } 

  ObjCountProductoCalificacion: CountProductoCalificacion = {
    NoCalificado: 0
  }

  ObjEvaluado: Evaluado = {
    id: '',
    evaluado: ''
  }

  ObjEvaluacion:Evaluacion ={
    id: '',
    tipo: '',
    nombre: '',
    puesto: '',
    observacion: '',
    estado: ''
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

 

  ObjPreguntasEvaluacion:ProductosEvaluacion ={
    id: '',
    id_evaluacion: '',
    id_producto: '',
    pregunta: '',
    calificacion: ''
  }

  ObjProductoDiagnostica: ProductoDiagnostica = {
    id: '',
    reference: '000000',
    nombre: '',
    evaluacion: '',
    evaluado: '',
    componente: '',
    indicacion: ''
  }

  constructor(private router: Router, private exchangeService: ExchangeService){
    this.idEvaluacion = <any>localStorage.getItem('idEvaluacion');
  }

  ngOnInit(): void {
    this.ListarEvaluacion(this.idEvaluacion!);
    this.ListarProductosDF();
    this.ProductoDiagnosticaCantidad();
  }




  ListarProductosDF(){
    localStorage.setItem('StartEvaluacion','1');
    this.ObjTipoEvaluacion.tipo = Number(localStorage.getItem('tipoEvaluacion'));
    this.exchangeService.ListProductosDF(this.ObjTipoEvaluacion).subscribe(res => {
      this.ListProductosDiagnostica = <any>res; 
      this.ObjProductoDiagnostica = <any>this.ListProductosDiagnostica?.shift();
      if(localStorage.getItem('StartEvaluacion') == '1'){
        this.newQuestion();
        localStorage.setItem('StartEvaluacion','0');
      }
      
    },
      err => {
        console.log(err);
      }

    );
  }


   
  

  ListarEvaluacion(id:string){
    this.ObjId.id = id;
    this.exchangeService.ListEvaluacion(this.ObjId).subscribe(res => {
      this.ObjEvaluacion = res[0];
      
    },
      err => {
        console.log(err);
      }

    );
  }

  ListarProductosEvaluacion(id:string):void{
    this.ObjId.id = id;
    this.exchangeService.ListProductosEvaluacion(this.ObjId).subscribe(res => {
      this.ObjProductosEvaluacionNew = res[0];
    },
      err => {
        console.log(err);
      }

    );

  }


 

  setDatosProductosEvaluacion(calificacion:string){
    this.ObjProductosEvaluacion.calificacion = calificacion;
      this.exchangeService.setProductosEvaluacion(this.ObjProductosEvaluacion).subscribe(res => {
        this.idItem = <any>res;
      },
        err => {
          console.log(err);
        }
  
      );
   }

   setProductoEvaluado(){
    this.ObjEvaluado.id = this.ObjProductoDiagnostica.id;
    this.ObjEvaluado.evaluado = '1' //significa que ya fue evaluado dicho producto
      this.exchangeService.editProductosDF(this.ObjEvaluado).subscribe(res => {
        this.ListarProductosDF();
      },
        err => {
          console.log(err);
        }
  
      );
   }

   editDatosProductosEvaluacion(calificacion:string){
    switch(localStorage.getItem('tipoEvaluacion')){
      case '0': this.editDatosProductosEvaluacionDiagnostica(calificacion);
      break;
      case '1': this.editDatosProductosEvaluacionFinal(calificacion);
      break;
    }
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
    this.loading = true;
    if(this.ObjProductoDiagnostica.nombre != '' && this.ObjProductoDiagnostica.nombre != undefined && this.ObjProductoDiagnostica.nombre != null){
      this.ObjProductosEvaluacion.id_evaluacion = <any>localStorage.getItem('idEvaluacion');
      this.ObjProductosEvaluacion.id_producto = this.ObjProductoDiagnostica.id;
      this.ObjId.id = <any>localStorage.getItem('idEvaluacion');

      this.flagImagen = true;

      
      this.exchangeService.ListProductosEvaluacion(this.ObjId).subscribe(res => {
        

        (res[0] ? this.ObjProductosEvaluacionNew = res[0] : this.ObjProductosEvaluacionNew)

      //this.ObjProductosEvaluacionNew = res[0];
      

        if(this.ObjProductosEvaluacionNew.pregunta != null && this.ObjProductosEvaluacionNew.pregunta != undefined && this.ObjProductosEvaluacionNew.pregunta != ''){
          this.NoPregunta = Number(this.ObjProductosEvaluacionNew.pregunta) + 1;
          this.ObjProductosEvaluacion.pregunta = String(this.NoPregunta);
          this.setDatosProductosEvaluacion('');
          this.ProductoCalificadoDiagnosticaCantidad();
          this.Limpiar();
          this.loading = false;
  
        }else{
          this.ObjProductosEvaluacion.pregunta = '1';
          this.ProductoCalificadoDiagnosticaCantidad();
          this.setDatosProductosEvaluacion('');
          this.Limpiar();
          this.loading = false;
          }



      
      

    },
      err => {
        console.log(err);
      }

    );

      
    }else{
      alert('Error seleciona un producto');
    }

  
   }

   Limpiar():void{
    this.model = '';
    this.ObjProductosEvaluacion.id = "";
    this.ObjProductosEvaluacion.id_evaluacion = "";
    this.ObjProductosEvaluacion.id_producto = "";
    //this.ObjProductosEvaluacion.pregunta = "";
    this.ObjProductosEvaluacion.calificacion = "";

    this.ObjProductosEvaluacionNew.id = "";
    this.ObjProductosEvaluacionNew.id_evaluacion = "";
    this.ObjProductosEvaluacionNew.id_producto = "";
    //this.ObjProductosEvaluacion.pregunta = "";
    this.ObjProductosEvaluacionNew.calificacion = "";
   }

   Finalizar():void{
    this.ObjEvaluacion.id = <string>localStorage.getItem('idEvaluacion');
    this.ObjEvaluacion.estado = '1';
      this.exchangeService.editEvaluacion(this.ObjEvaluacion).subscribe(res => {
        this.resetProductosDiagnostica();
        this.router.navigate(['calificacion-evaluacion']);
        this.flagEnd = true;
        
      },
        err => {
          console.log(err);
        }
  
      );
    
    
   }



   ProductoDiagnosticaCantidad(){
    this.ObjTipoEvaluacion.tipo = Number(localStorage.getItem('tipoEvaluacion'));
    this.exchangeService.CantidadProductoDF(this.ObjTipoEvaluacion).subscribe(res => {
      this.ObjCountProductoEvaluacion = res[0];
    },
      err => {
        console.log(err);
      }

    );
  }

  ProductoCalificadoDiagnosticaCantidad(){
    this.ObjTipoEvaluacion.tipo = Number(localStorage.getItem('tipoEvaluacion'));
    this.exchangeService.CantidadProductoCalificadoDF(this.ObjTipoEvaluacion).subscribe(res => {
      this.ObjCountProductoCalificacion = res[0];
      this.calculoPorcentajeAvance();
    },
      err => {
        console.log(err);
      }

    );
  }

  resetProductosDiagnostica(){
    this.ObjEvaluadoReset.evaluado = 0;
    this.exchangeService.resetProductosDiagnostica(this.ObjEvaluadoReset).subscribe(res => {
     },
       err => {
         console.log(err);
       }
 
     );
  }

  ProductosCalificados(){
    this.ObjIdCalificacion.id = <string>localStorage.getItem('idEvaluacion');
    this.exchangeService.ListProductosCalificados(this.ObjIdCalificacion).subscribe(res => {
      this.ListProductosCalificados = <any>res;
      this.countPreguntas();
     },
       err => {
         console.log(err);
       }
 
     );
  }

  countPreguntas(){

    for (const i of this.ListProductosCalificados!) {
      
      if(i.calificacion == 0){
        // this.product.push(i.pregunta.toString());
        this.countExcelente++;
      }

      if(i.calificacion == 1){
        this.countRegular++;
      }

      if(i.calificacion == 2){
        this.countErroneo++;
      }
      
    }
    console.log('Excelente ',this.countExcelente, 'Regular ', this.countRegular, 'Erroneo ', this.countErroneo );
   
    this.porcentajeExcelente = (this.countExcelente * 100)/this.ObjCountProductoEvaluacion.NoEvaluado;
    this.porcentajeRegular = (this.countRegular * 100)/this.ObjCountProductoEvaluacion.NoEvaluado;
    this.porcentajeErroneo = (this.countErroneo * 100)/this.ObjCountProductoEvaluacion.NoEvaluado;

    this.countExcelente = 0;
    this.countRegular = 0;
    this.countErroneo = 0;

  }

  
  calculoPorcentajeAvance(){
    console.log('ObjCountProductoCalificacion.NoCalificado ',this.ObjCountProductoCalificacion.NoCalificado);
    console.log('ObjCountProductoEvaluacion.NoEvaluado ',this.ObjCountProductoEvaluacion.NoEvaluado);
   this.PorcentajeAvance = ((this.ObjCountProductoCalificacion.NoCalificado + 1) * 100)/this.ObjCountProductoEvaluacion.NoEvaluado;
   console.log('este es el porcentaje avanzado ', this.PorcentajeAvance);
  }


  editDatosProductosEvaluacionDiagnostica(calificacion:string){
    
    if(this.ObjProductosEvaluacion.pregunta !== '195'){
      if(this.ObjProductosEvaluacion.pregunta != null && this.ObjProductosEvaluacion.pregunta != "" && this.ObjProductosEvaluacion.pregunta != ''){
        this.ObjProductosEvaluacion.calificacion = calificacion;
        this.ObjProductosEvaluacion.id = this.idItem;
        
      if(this.ObjProductosEvaluacion.calificacion === '0' || this.ObjProductosEvaluacion.calificacion === '1' || this.ObjProductosEvaluacion.calificacion === '2' ){
        if(this.ObjProductosEvaluacion.id != '' && this.ObjProductosEvaluacion.id != "" && this.ObjProductosEvaluacion.id != null && this.ObjProductosEvaluacion.id != undefined){
          console.log('este es el id de la pregunta ',this.ObjProductosEvaluacion.id,' y esta es su calificaion',this.ObjProductosEvaluacion.calificacion);
          this.exchangeService.editProductosEvaluacion(this.ObjProductosEvaluacion).subscribe(res => {
    
            
            this.flagImagen = false;
            this.model = "";
            this.ObjProductosEvaluacion.id_evaluacion = "";
            this.ObjProductosEvaluacion.id_producto = "";
            this.ObjProductosEvaluacion.pregunta = "";
            this.ObjProductosEvaluacion.calificacion = "";
            this.ObjProductosEvaluacionNew.pregunta = "";
            this.idItem = "";
            this.setProductoEvaluado();
            
          
        },
          err => {
            console.log(err);
          }
    
        );
        }
       
      }
        
      }else{
        alert('Espera a que cargue el producto >:C ');
      }
  
    }else{
      alert('Ya no hay mas productos por calificar :) ');
    }

    if(this.ObjProductosEvaluacion.pregunta === '195'){

      this.ObjProductosEvaluacion.calificacion = calificacion;
      this.ObjProductosEvaluacion.id = this.idItem;
  
        this.exchangeService.editProductosEvaluacion(this.ObjProductosEvaluacion).subscribe(res => {
  
          
            this.flagImagen = false;
            this.model = "";
            this.ObjProductosEvaluacion.id_evaluacion = "";
            this.ObjProductosEvaluacion.id_producto = "";
            this.ObjProductosEvaluacion.pregunta = "";
            this.ObjProductosEvaluacion.calificacion = "";
            this.ObjProductosEvaluacionNew.pregunta = "";
            this.idItem = "";
            

            this.ObjEvaluado.id = this.ObjProductoDiagnostica.id;
      this.ObjEvaluado.evaluado = '1' //significa que ya fue evaluado dicho producto
      this.exchangeService.editProductosDF(this.ObjEvaluado).subscribe(res => {
        
      },
        err => {
          console.log(err);
        }
  
      );
            
          
        },
          err => {
            console.log(err);
          }
    
        );
      

      
      
    }
    
  }

  editDatosProductosEvaluacionFinal(calificacion:string){
    
    if(this.ObjProductosEvaluacion.pregunta !== '375'){
      if(this.ObjProductosEvaluacion.pregunta != null && this.ObjProductosEvaluacion.pregunta != ""){
        this.ObjProductosEvaluacion.calificacion = calificacion;
        this.ObjProductosEvaluacion.id = this.idItem;
        
      if(this.ObjProductosEvaluacion.calificacion == '0' || this.ObjProductosEvaluacion.calificacion == '1' || this.ObjProductosEvaluacion.calificacion == '2' ){
        if(this.ObjProductosEvaluacion.id != '' && this.ObjProductosEvaluacion.id != "" && this.ObjProductosEvaluacion.id != null && this.ObjProductosEvaluacion.id != undefined){
        this.exchangeService.editProductosEvaluacion(this.ObjProductosEvaluacion).subscribe(res => {
  
          
          this.flagImagen = false;
          this.model = "";
          this.ObjProductosEvaluacion.id_evaluacion = "";
          this.ObjProductosEvaluacion.id_producto = "";
          this.ObjProductosEvaluacion.pregunta = "";
          this.ObjProductosEvaluacion.calificacion = "";
          this.ObjProductosEvaluacionNew.pregunta = "";
          this.idItem = "";
          this.setProductoEvaluado();
          
        
      },
        err => {
          console.log(err);
        }
  
      );
      }
      }
        
      }else{
        alert('Espera a que cargue el producto >:C ');
      }
  
    }else{
      alert('Ya no hay mas productos por calificar :) ');
    }

    if(this.ObjProductosEvaluacion.pregunta === '375'){

      this.ObjProductosEvaluacion.calificacion = calificacion;
      this.ObjProductosEvaluacion.id = this.idItem;
  
        this.exchangeService.editProductosEvaluacion(this.ObjProductosEvaluacion).subscribe(res => {
  
          
            this.flagImagen = false;
            this.model = "";
            this.ObjProductosEvaluacion.id_evaluacion = "";
            this.ObjProductosEvaluacion.id_producto = "";
            this.ObjProductosEvaluacion.pregunta = "";
            this.ObjProductosEvaluacion.calificacion = "";
            this.ObjProductosEvaluacionNew.pregunta = "";
            this.idItem = "";
            

            this.ObjEvaluado.id = this.ObjProductoDiagnostica.id;
      this.ObjEvaluado.evaluado = '1' //significa que ya fue evaluado dicho producto
      this.exchangeService.editProductosDF(this.ObjEvaluado).subscribe(res => {
        
      },
        err => {
          console.log(err);
        }
  
      );
            
          
        },
          err => {
            console.log(err);
          }
    
        );
      

      
      
    }
    
  }


}
