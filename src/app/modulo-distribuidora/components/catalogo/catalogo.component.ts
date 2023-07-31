import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as pdfMake from "pdfmake/build/pdfmake";
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import { ExchangeService, ProductoDiagnostica, TipoEvaluacion } from 'src/app/modulo-evaluacion/services/exchange.service';
import { environment } from 'src/environments/environment';
(<any>pdfMake).vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-catalogo',
  template: '<img [src]="imageURL" alt="Imagen">',
  templateUrl: './catalogo.component.html',
  styleUrls: ['./catalogo.component.css']
})
export class CatalogoComponent implements OnInit{
  
  URL = environment.PORT;
  filtroNombre?: string;
  imageUrl: string;

  ListProductosDiagnostica?:ProductoDiagnostica[];

  ObjTipoEvaluacion:TipoEvaluacion = {
    tipo: 0
  }

  

  constructor(private router: Router, private exchangeService: ExchangeService, private http: HttpClient){}

  ngOnInit(): void {
    
    this.ListarProductosDF();
  }

  

  ListarProductosDF(){
    
    this.ObjTipoEvaluacion.tipo = 0;
    this.exchangeService.ListProductosDF(this.ObjTipoEvaluacion).subscribe(res => {
      this.ListProductosDiagnostica = <any>res; 
     
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
  //         text: 'Calificacion',
  //         fontSize: 24,
  //         bold: true,
  //         alignment: 'center',
  //         margin: [0, 5],
  //       },
  //       {
  //         style: 'tableExample',
  //         table: {
  //           widths: [165, 165, 165],
  //           body: [
  //             [{
  //               image: this.imageUrl, width: 200, height: 200}, { text: 'Producto', bold: true, alignment: 'center' }, { text: 'Calificacion', bold: true, alignment: 'center' }],
  //             ['pregunta', 'producto', 'calificacion'],
  //           ],
  //         },
  //       },
  //     ],
  //   };

  //   pdfMake.createPdf(documentDefinition).open();
  // }


  getImageFromAPI() {
    const apiURL = 'tu_url_de_api/uploads/000004.png';
    this.http.get(apiURL, { responseType: 'blob' })
      .subscribe((response: Blob) => {
        // Crea un objeto URL para la imagen recibida y muestra la imagen
        this.imageUrl = URL.createObjectURL(response);
      });
  }
  
 
  generarPDF() {
    this.getBase64Image(this.imageUrl).then((base64Data) => {
      const docDefinition = {
        content: [
          'Texto antes de la imagen',
          {
            image: base64Data,
            width: 300,
          },
          'Texto después de la imagen',
        ],
      };

      const pdfDocGenerator = pdfMake.createPdf(docDefinition);
      pdfDocGenerator.download('nombre_del_archivo.pdf');
    });
  }

  // Función para obtener la imagen en formato de datos (data URL)
  getBase64Image(url: string): Promise<string> {
    return new Promise((resolve) => {
      const img = new Image();
      img.crossOrigin = 'Anonymous';
      img.onload = function () {
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;

        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0);

        const dataURL = canvas.toDataURL('image/png'); // Puedes cambiar 'image/png' por el formato de imagen que necesites

        resolve(dataURL);
      };

      // Agregar el bloque try-catch
      img.onerror = function () {
        try {
          // Si hay un error, puedes resolver la promesa con una URL de imagen de respaldo o un valor predeterminado
          const backupDataURL = 'https://upload.wikimedia.org/wikipedia/commons/4/48/Basketball.jpeg';
          resolve(backupDataURL);
        } catch (error) {
          // Manejar cualquier otro error que pueda ocurrir durante la resolución
          console.error('Error al cargar la imagen de respaldo:', error);
          resolve(null); // Otra opción puede ser rechazar la promesa aquí con reject(error)
        }
      };

      img.src = url;
    });
  }
  
  
}
