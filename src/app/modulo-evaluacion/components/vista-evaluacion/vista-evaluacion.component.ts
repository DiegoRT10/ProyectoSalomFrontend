import { Component, OnInit } from '@angular/core';
import { ProductsService, ViewProducts2 } from 'src/app/modulo-venta/services/products.service';
import { ExchangeService, Evaluacion, ProductosEvaluacion, ID } from '../../services/exchange.service';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-vista-evaluacion',
  templateUrl: './vista-evaluacion.component.html',
  styleUrls: ['./vista-evaluacion.component.css']
})
export class VistaEvaluacionComponent implements OnInit {

  ListaProductsCodeName?:ViewProducts2[];
  URL = environment.PORT;
  
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

  idEvaluacion:string="";
  flag:boolean=false;


  constructor(private router: Router, private exchangeService: ExchangeService, private products:ProductsService, private activatedRoute:ActivatedRoute,){

  }

  ngOnInit(): void {

    this.getProductsCodeName();

    setInterval(() => {
      this.ListarEvaluacionInit();
    }, 3000);

    setInterval(() => {
      this.ListarProductosEvaluacion(this.ObjEvaluacion.id);
    }, 3000);

    
  }

  ListarProductosEvaluacion(id:string):void{
   
    if(this.flag){
      this.ObjId.id = id;
    console.log('este es el dato a enviar xd',this.ObjId.id);
    this.exchangeService.ListProductosEvaluacion(this.ObjId).subscribe(res => {
      console.log('este es el res de lista de productos ', res[0]);
      if(res[0]){
        console.log('entre al if ');
        this.ObjProductosEvaluacionNew = res[0];
        this.ObjProductoCodeName.reference = <any>this.ListaProductsCodeName?.find(element => element.id === this.ObjProductosEvaluacionNew.id_producto)?.reference;
        console.log('este es el reference ',this.ObjProductoCodeName.reference);
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
        console.log('lista evaluacion ',this.ObjEvaluacion);
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
    console.log('este es el dato a enviar ',this.ObjId.id);
    this.exchangeService.ListEvaluacionEnd(this.ObjId).subscribe(res => {
      this.ObjEvaluacionEnd = res[0];
      console.log('este es el dato del evalucion init ',this.ObjEvaluacionEnd.estado);
      if(this.ObjEvaluacionEnd.estado == '1'){
        this.flag=false;
       
      }
      
    },
      err => {
        console.log(err);
      }

    );

  }
  }


}
