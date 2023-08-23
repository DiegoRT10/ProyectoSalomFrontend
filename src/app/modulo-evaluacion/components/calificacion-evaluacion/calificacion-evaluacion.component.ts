import { Component, HostListener, OnInit } from '@angular/core';
import { CountProductoCalificacion, CountProductoEvaluacion, Evaluacion, ExchangeService, ID, ProductosCalificados, TipoEvaluacion } from '../../services/exchange.service';
import { Router } from '@angular/router';
import * as pdfMake from "pdfmake/build/pdfmake";
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
(<any>pdfMake).vfs = pdfFonts.pdfMake.vfs;



@Component({
  selector: 'app-calificacion-evaluacion',
  templateUrl: './calificacion-evaluacion.component.html',
  styleUrls: ['./calificacion-evaluacion.component.css']
})
export class CalificacionEvaluacionComponent implements OnInit {
  

  ListProductosCalificados?:ProductosCalificados[];
  countExcelente:number=0;
  countRegular:number=0;
  countErroneo:number=0;

  porcentajeExcelente:number=0;
  porcentajeRegular:number=0;
  porcentajeErroneo:number=0;

  flag:boolean = false;
  
  listaOp: String[] = ['Evaluacion Administradores Diagnostica', 'Evaluacion Administradores Final','Evaluacion Bodega Diagnostica','Evaluacion Bodega Final'];

  ObjEvaluacion: Evaluacion = {
    id: '',
    tipo: '',
    nombre: '',
    puesto: '',
    observacion: '',
    estado: ''
  }

  ObjCountProductoEvaluacion: CountProductoEvaluacion = {
    NoEvaluado: 0
  } 

  ObjCountProductoCalificacion: CountProductoCalificacion = {
    NoCalificado: 0
  }

  ObjIdCalificacion: ID = {
    id: ''
  }

  ObjIdCalificacionPDF: ID = {
    id: ''
  }

  ObjTipoEvaluacion:TipoEvaluacion = {
    tipo: 0
  }

  
  constructor(private router: Router, private exchangeService: ExchangeService){

  }

  ngOnInit(): void {
    this.ProductoDiagnosticaCantidad(5)
  }

  @HostListener('window:beforeunload', ['$event'])
  onBeforeUnload($event: any): void {
    $event.returnValue = 'Al salir se perderan los datos de evaluacion';
    localStorage.removeItem('idEvaluacion');
    localStorage.removeItem('NoPregunta');
  }


  ProductosCalificados(id:string){
    (id == '0' ? this.ObjIdCalificacion.id = <string>localStorage.getItem('idEvaluacion') : this.ObjIdCalificacion.id = this.ObjIdCalificacionPDF.id)
    this.exchangeService.ListProductosCalificados(this.ObjIdCalificacion).subscribe(res => {
      this.ListProductosCalificados = <any>res;
      console.log('productos calificadso ',this.ListProductosCalificados);
      this.countPreguntas();
      this.ObjIdCalificacionPDF.id = '';
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

  
  ProductoDiagnosticaCantidad(tipo:number){
    (tipo == 5 ? this.ObjTipoEvaluacion.tipo = Number(localStorage.getItem('tipoEvaluacion')) : this.ObjTipoEvaluacion.tipo = tipo)
    this.ObjTipoEvaluacion.tipo = Number(localStorage.getItem('tipoEvaluacion'));
    this.exchangeService.CantidadProductoDF(this.ObjTipoEvaluacion).subscribe(res => {
      this.ObjCountProductoEvaluacion = res[0];
      (tipo == 5 ? this.ProductosCalificados('0') : this.ProductosCalificados('1'))
      
    },
      err => {
        console.log(err);
      }

    );
  }

  
  // generarPDF() {
  //   const documentDefinition = {
  //     content: [
  //       {
  //         text: 'Calificacion', // Texto del PDF
  //         fontSize: 24, // Tamaño de fuente
  //         bold: true, // Texto en negrita
  //         alignment: 'center', // Alineación del texto
  //         margin: [0, 20], // Márgenes (arriba, abajo, izquierda, derecha)
  //       },
  //       {
  //         text: 'Se muestra el resultado de las preguntas erroneas',
  //         fontSize: 14,
  //         margin: [0, 10],
  //       },
  //       {
	// 		style: 'tableExample',
	// 		table: {
	// 			widths: [165, 165, 165, 165],
	// 			body: [

	// 				[{text: 'Pregunta', bold: true, alignment: 'center'}, {text: 'Producto', bold: true, alignment: 'center'}, {text: 'Calificacion', bold: true, alignment: 'center'}],
	// 				['1','producto A', 'excelente']
	// 			]
	// 		}
	// 	},
  //     ],
  //   };

  //   pdfMake.createPdf(documentDefinition).open();
  // }

  generarPDF(datos: ProductosCalificados[]) {
    const documentDefinition = {
      content: [
        {
          text: 'Calificacion',
          fontSize: 24,
          bold: true,
          alignment: 'center',
          margin: [0, 5],
        },
        {
          style: 'tableExample',
          table: {
            widths: [165, 165, 165],
            body: [
              [{ text: 'Pregunta', bold: true, alignment: 'center' }, { text: 'Producto', bold: true, alignment: 'center' }, { text: 'Calificacion', bold: true, alignment: 'center' }],
              ...datos
              .filter((dato) => dato.calificacion > 0)
              .map((dato) => [dato.pregunta.toString(), dato.name, (dato.calificacion == 2 ? 'Erroneo' : 'Regular')]),
            ],
          },
        },
      ],
    };

    pdfMake.createPdf(documentDefinition).open();
  }

  newCalificacion(){
    this.flag = true;
  }

  callCalificacionEvaluacion(){
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

    if(this.ObjEvaluacion.tipo != ''){
      this.ProductoDiagnosticaCantidad(6);
      this.flag = false;
    }

  }
}
