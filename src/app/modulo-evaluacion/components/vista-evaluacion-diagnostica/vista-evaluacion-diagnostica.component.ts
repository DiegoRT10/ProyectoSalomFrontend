import { Component, OnInit } from '@angular/core';
import { ProductsService, ViewProducts2 } from 'src/app/modulo-venta/services/products.service';
import { ExchangeService, Evaluacion, ProductosEvaluacion, ID } from '../../services/exchange.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-vista-evaluacion-diagnostica',
  templateUrl: './vista-evaluacion-diagnostica.component.html',
  styleUrls: ['./vista-evaluacion-diagnostica.component.css']
})
export class VistaEvaluacionDiagnosticaComponent implements OnInit {

  ListaProductsCodeName?:ViewProducts2[];
  
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

  ObjEvaluacion:Evaluacion ={
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

  idEvaluacion:string="";
  flag:boolean=false;

  constructor(private router: Router, private exchangeService: ExchangeService, private products:ProductsService){

  }

  ngOnInit(): void {

   
    this.getProductsCodeName();
    setInterval(() => {
      this.ListarProductosEvaluacion(this.ObjEvaluacion.id);
    }, 3000);
  }

  ListarProductosEvaluacion(id:string):void{
    if(this.flag){

      this.ObjId.id = id;
    console.log('este es el dato a enviar xd',this.ObjId.id);
    this.exchangeService.ListProductosEvaluacion(this.ObjId).subscribe(res => {

      if(res[0]){
        this.ObjProductosEvaluacionNew = res[0];
        this.ObjProductoCodeName.nombre = this.ListaProductsCodeName!.find(objeto => objeto.id === this.ObjProductosEvaluacionNew.id_producto)?.nombre!;
      }else{ this.ObjProductosEvaluacionNew}

      
     
      console.log('datos recibido producto ',this.ObjProductosEvaluacionNew);
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
    console.log('este es el dato a enviar ',this.ObjId.id);
    this.exchangeService.ListEvaluacion(this.ObjId).subscribe(res => {

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



}
