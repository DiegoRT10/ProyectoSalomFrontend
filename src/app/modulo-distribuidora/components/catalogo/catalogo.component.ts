import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as pdfMake from "pdfmake/build/pdfmake";
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import { ExchangeService, ProductoDF, TipoEvaluacion } from 'src/app/modulo-evaluacion/services/exchange.service';
import { environment } from 'src/environments/environment';
import { ProductoCatalogo, ProductosService } from '../../services/productos.service';

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



  ListProductosCatalogo?:ProductoCatalogo[];



  

  constructor(private router: Router, private productosService: ProductosService, private http: HttpClient){}

  ngOnInit(): void {
    
    this.ListarProductosDF();
  }

  

  ListarProductosDF(){
    
    this.productosService.ListProductoCatalogo().subscribe(res => {
      this.ListProductosCatalogo = <any>res; 
     console.log('productos de catalogo ',this.ListProductosCatalogo);
    },
      err => {
        console.log(err);
      }

    );
  }

  
  generarPDF() {
    const imageUrls = this.ListProductosCatalogo.map(producto => `assets/products/${producto.reference}.png`);
  
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
      this.createPDF(base64Images, this.ListProductosCatalogo.map(producto => producto.reference),this.ListProductosCatalogo.map(producto => String(producto.pormayor)), this.ListProductosCatalogo.map(producto => producto.name)); // Llamamos a la función para crear el PDF
    });
  }
  
  createPDF(base64Images: string[], references: string[], pormayor: string[], nombre: string[]) {

    

    // Agrupamos cada imagen con su referencia en un solo objeto
    const imagesWithReferences = base64Images.map((base64, index) => ({
      image: base64,
      reference: references[index],
      nombre: nombre[index],
      pormayor: pormayor[index],
      width: 160,
      height: 175,
    }));
  
    // Divide las imágenes en grupos de tres
    const imagesInGroupsOfThree = [];
    for (let i = 0; i < imagesWithReferences.length; i += 3) {
      imagesInGroupsOfThree.push(imagesWithReferences.slice(i, i + 3));
    }
  
    // Construye la tabla con las imágenes y referencias agrupadas
    // const tableBody = imagesInGroupsOfThree.map((imageGroup) => {
    //   const row = [];
    //   imageGroup.forEach((item, columnIndex) => {
    //     // Creamos una celda que contiene el id/reference y la imagen en la misma celda
    //     const cell = {
    //       stack: [
    //         { text: `${item.reference}`, alignment: 'center', margin: [0, 5]},
    //         { text: `Q${item.pormayor}`, alignment: 'center', bold:'true'},
    //         { text: `${item.nombre}`, alignment: 'center', fontSize: 12, margin: [0, 5]},
    //         { image: item.image, width: 160, height: 213, margin: [0, 57]}
            
    //       ],
    //       alignment: 'center',
    //       // border: [false, false, true, true], 
    //       border: columnIndex === 2 ? [false, false, false, true] : [false, false, true, true],
    //     };
    //     row.push(cell);
    //   });
    //   return row;
    // });

    const tableBody = imagesInGroupsOfThree.map((imageGroup) => {
      const row = [];
      imageGroup.forEach((item, columnIndex) => {
        // Dividir el texto en líneas si su longitud es mayor o igual a 20
        const nombreLines = item.nombre.length >= 20
          ? this.splitTextIntoLines(item.nombre, 20)
          : [item.nombre];
  
        const cell = {
          stack: [
            { text: `${item.reference}`, alignment: 'center', },
            { text: `Q${item.pormayor}`, alignment: 'center', bold: true },
            ...nombreLines.map((line, index) => ({ text: line, alignment: 'center', fontSize: 12 })),
            // { text: 'PEDIALYTE COCO', alignment: 'center', fontSize: 12, margin: [0,5] },
            // { text: '#60 + ZINC', alignment: 'center', fontSize: 12, margin: [0,5] },
            { image: item.image, width: 160, height: 175, margin: [0, 55] }
          ],
          alignment: 'center',
          border: columnIndex === 2 ? [false, false, false, true] : [false, false, true, true]
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



  // splitTextIntoLines(text: string, maxLength: number): string[] {
  //   const lines = [];
  //   let currentLine = '';
    
  //   for (const word of text.split(' ')) {
  //     if (currentLine.length + word.length <= maxLength) {
  //       currentLine += (currentLine.length > 0 ? ' ' : '') + word;
  //     } else {
  //       lines.push(currentLine);
  //       currentLine = word;
  //     }
  //   }
    
  //   if (currentLine.length > 0) {
  //     lines.push(currentLine);
  //   }
    
  //   return lines;
  // }

  // splitTextIntoLines(text: string, maxLength: number): string[] {
  //   const lines = [];
  //   let currentLine = '';
    
  //   for (const word of text.split(' ')) {
  //     if (currentLine.length + word.length <= maxLength || word === '+') {
  //       currentLine += (currentLine.length > 0 ? ' ' : '') + word;
  //     } else {
  //       lines.push(currentLine);
  //       currentLine = word;
  //     }
  //   }
    
  //   if (currentLine.length > 0) {
  //     lines.push(currentLine);
  //   }
    
  //   return lines;
  // }
  
  splitTextIntoLines(text: string, maxLength: number): string[] {
    const lines = [];
    let currentLine = '';
    
    for (const word of text.split(/(\s|\+)/)) {
      if (currentLine.length + word.length <= maxLength) {
        currentLine += (currentLine.length > 0 ? (word === '+' ? '+' : ' ') : '') + word;
      } else {
        lines.push(currentLine);
        currentLine = word;
      }
    }
    
    if (currentLine.length > 0) {
      lines.push(currentLine);
    }
    
    return lines;
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
