import { Component, OnInit } from '@angular/core';
import { ProductsService, ViewProducts2 } from 'src/app/modulo-venta/services/products.service';
import { ExchangeService, Evaluacion, ProductosEvaluacion, ID, CountProductoEvaluacion, CountProductoCalificacion, TipoEvaluacion } from '../../services/exchange.service';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'app-vista-evaluacion',
  templateUrl: './vista-evaluacion.component.html',
  styleUrls: ['./vista-evaluacion.component.css'],
  
  
})
export class VistaEvaluacionComponent implements OnInit {

  ListaProductsCodeName?:ViewProducts2[];
  URL = environment.PORT;
  PorcentajeAvance:number = 0;

  ObjTipoEvaluacion:TipoEvaluacion = {
    tipo: 0
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
    reference:'',
    nombre: '',
    code_name: ''
  }

  ObjEvaluacion:Evaluacion ={
    id: '',
    tipo: '',
    nombre: '',
    puesto: '',
    observacion: '',
    estado: ''
  };

  ObjEvaluacionEnd:Evaluacion ={
    id: '',
    tipo: '',
    nombre: '',
    puesto: '',
    observacion: '',
    estado: ''
  };
 
  ObjId: ID = {
    id: ''
  }

  ObjCountProductoEvaluacion: CountProductoEvaluacion = {
    NoEvaluado: 0
  } 

  ObjCountProductoCalificacion: CountProductoCalificacion = {
    NoCalificado: 0
  }

  idEvaluacion:string="";
  flag:boolean=false;


  constructor(private router: Router, private exchangeService: ExchangeService, private products:ProductsService, private activatedRoute:ActivatedRoute,){

  }

  ngOnInit(): void {

    AppComponent.viewBar = false;

     this.getProductsCodeName();

    setInterval(() => {
      this.ListarEvaluacionInit();
    }, 1000);

    setInterval(() => {
      this.ListarProductosEvaluacion(this.ObjEvaluacion.id);
    }, 1000);

    
  }

  ListarProductosEvaluacion(id:string):void{
   
    if(this.flag){
      this.ObjId.id = id;
    this.exchangeService.ListProductosEvaluacion(this.ObjId).subscribe(res => {
      if(res[0]){
        this.ObjProductosEvaluacionNew = res[0];
        this.ObjProductoCodeName.reference = <any>this.ListaProductsCodeName?.find(element => element.id === this.ObjProductosEvaluacionNew.id_producto)?.reference;
        this.ObjProductoCodeName.nombre = this.ListaProductsCodeName!.find(objeto => objeto.id === this.ObjProductosEvaluacionNew.id_producto)?.nombre!;
        this.ProductoDiagnosticaCantidad()
      }else{ this.ObjProductosEvaluacionNew}
    },
      err => {
        console.log(err);
      }

    );

    }
    

  }

  getProductsCodeName(): void {
    this.products.getViewsProductsCodeName().subscribe(res => {
      this.ListaProductsCodeName = <any>res;
      
    },
      err => {
        console.log(err);
      }

    );
  }

  ListarEvaluacion(){
    this.ObjId.id = this.idEvaluacion;
    this.exchangeService.ListEvaluacion(this.ObjId).subscribe(res => {
      
      console.log('este es el res de lista de evaluacion ',res[0]);

      if(res[0]) {
        this.ObjEvaluacion = res[0];
        this.flag=true;
      }else{
        this.ObjEvaluacion;
        this.flag=false;
      }


      
      
    },
      err => {
        console.log(err);
      }

    );
  }


  ListarEvaluacionInit(){

    if(this.flag){
    this.ObjId.id = this.idEvaluacion;
    this.exchangeService.ListEvaluacionEnd(this.ObjId).subscribe(res => {
      this.ObjEvaluacionEnd = res[0];
      localStorage.setItem('tipoEvaluacion',this.ObjEvaluacionEnd.tipo);
      localStorage.setItem('idEvaluacion',this.ObjEvaluacionEnd.id);
      
      if(this.ObjEvaluacionEnd.estado == '1'){
        this.flag=false;
        this.router.navigate(['calificacion-evaluacion']);
      }
      
    },
      err => {
        console.log(err);
      }

    );

  }
  }

  
  ProductoDiagnosticaCantidad(){
    this.ObjTipoEvaluacion.tipo = Number(localStorage.getItem('tipoEvaluacion'));
    this.exchangeService.CantidadProductoDF(this.ObjTipoEvaluacion).subscribe(res => {
      this.ObjCountProductoEvaluacion = res[0];
      this.ProductoCalificadoDiagnosticaCantidad();
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


  calculoPorcentajeAvance(){
    console.log('ObjCountProductoCalificacion.NoCalificado ',this.ObjCountProductoCalificacion.NoCalificado);
    console.log('ObjCountProductoEvaluacion.NoEvaluado ',this.ObjCountProductoEvaluacion.NoEvaluado);
   this.PorcentajeAvance = ((this.ObjCountProductoCalificacion.NoCalificado) * 100)/this.ObjCountProductoEvaluacion.NoEvaluado;
   console.log('este es el porcentaje avanzado ', this.PorcentajeAvance);
  }


}
