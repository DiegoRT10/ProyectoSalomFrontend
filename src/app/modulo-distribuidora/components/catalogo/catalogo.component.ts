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

  
  generarPDF() {
    const imageUrls = this.ListProductosDiagnostica.map(producto => `assets/products/${producto.reference}.png`);
  
    // Función para cargar la imagen o usar la imagen por defecto
    const loadOrDefaultImage = (url: string): Promise<string> => {
      return new Promise((resolve) => {
        const image = new Image();
        image.onload = () => {
          // La imagen se ha cargado correctamente, utilizamos la URL
          resolve(url);
        };
        image.onerror = () => {
          // Error al cargar la imagen, utilizamos la imagen por defecto
          resolve('assets/products/000000.png');
        };
        image.src = url;
      });
    };
  
    // Cargamos las imágenes y las convertimos a base64
    const promises = imageUrls.map(url =>
      loadOrDefaultImage(url)
        .then((validUrl) =>
          fetch(validUrl)
            .then(response => response.blob())
            .then(blob => {
              const reader = new FileReader();
              return new Promise<string>((resolve) => {
                reader.onloadend = () => {
                  const base64 = reader.result as string;
                  resolve(base64);
                };
                reader.readAsDataURL(blob);
              });
            })
        )
    );
  
    // Esperamos a que todas las imágenes se hayan cargado y convertido a base64
    Promise.all(promises).then((base64Images) => {
      this.createPDF(base64Images, this.ListProductosDiagnostica.map(producto => producto.reference)); // Llamamos a la función para crear el PDF
    });
  }
  
  createPDF(base64Images: string[], references: string[]) {

    

    // Agrupamos cada imagen con su referencia en un solo objeto
    const imagesWithReferences = base64Images.map((base64, index) => ({
      image: base64,
      reference: references[index],
      width: 160,
      height: 215,
    }));
  
    // Divide las imágenes en grupos de tres
    const imagesInGroupsOfThree = [];
    for (let i = 0; i < imagesWithReferences.length; i += 3) {
      imagesInGroupsOfThree.push(imagesWithReferences.slice(i, i + 3));
    }
  
    // Construye la tabla con las imágenes y referencias agrupadas
    const tableBody = imagesInGroupsOfThree.map((imageGroup) => {
      const row = [];
      imageGroup.forEach((item, columnIndex) => {
        // Creamos una celda que contiene el id/reference y la imagen en la misma celda
        const cell = {
          stack: [
            { text: `CODIN: ${item.reference}`, alignment: 'center', margin: [0, 5]},
            { image: item.image, width: 160, height: 215, margin: [0, 57]},
          ],
          alignment: 'center',
          // border: [false, false, true, true], 
          border: columnIndex === 2 ? [false, false, false, true] : [false, false, true, true],
        };
        row.push(cell);
      });
      return row;
    });
  
    // Agregamos una fila vacía si el número de imágenes no es divisible por tres
    if (imagesWithReferences.length % 3 !== 0) {
      const emptyCells = 3 - (imagesWithReferences.length % 3);
      for (let i = 0; i < emptyCells; i++) {
        tableBody[tableBody.length - 1].push({});
      }
    }
  

      //un comentario
    fetch('assets/logos/econoFarma.png')
    .then(response => response.blob())
    .then(blob => {
      const reader = new FileReader();
      reader.onloadend = () => {
        const econoFarmaBase64 = reader.result as string;
        // Continuar con la creación del PDF incluyendo la imagen de econoFarma
        const documentDefinition = {
          content: [
            [
              {
                image: econoFarmaBase64, // Agregar la imagen de lado izquierdo
                width: 200,
                alignment: 'right',
              },
              {
                text: 'CATÁLOGO PRODUCTOS', // Agregar el texto
                fontSize: 20,
                bold: true,
                alignment: 'left',
                margin: [0, 5],
              },
            ],
            {
              style: 'tableExample',
              table: {
                body: tableBody,
              },
            },
          ],
        };

        pdfMake.createPdf(documentDefinition).open();
      };
      reader.readAsDataURL(blob);
    });
  }







 

}
 
  
  
   // const documentDefinition = {
    //   content: [
    //     // {
    //     //   text: 'CATALOGO DE PRODUCTOS',
    //     //   fontSize: 20,
    //     //   bold: true,
    //     //   alignment: 'left',
    //     //   margin: [0, 0],
    //     // }, 
        

    //     [
    //       {
    //         image: 'assets/logos/econoFarma.png', // Agregar la imagen de lado izquierdo
    //         width: 100,
    //       },
    //       {
    //         text: 'CATÁLOGO PRODUCTOS', // Agregar el texto
    //         fontSize: 24,
    //         bold: true,
    //         alignment: 'center',
    //         margin: [50, 5],
    //       },
    //     ],
    //     {
    //       style: 'tableExample',
    //       table: {
    //         // widths: ['auto', 'auto', 'auto'],
    //         body: 
    //         tableBody,
    //       },
    //     },
    //   ],
    // };
  
    // pdfMake.createPdf(documentDefinition).open();
