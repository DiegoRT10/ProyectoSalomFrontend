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
    // Reemplaza las rutas de las imágenes con las que tienes en tu proyecto
    const imageUrls = [
      'assets/products/000004.png',
      'assets/products/000005.png',
      'assets/products/000006.png',
      // 'assets/products/000006.png',
      // 'assets/products/000008.png',
      // 'assets/products/000010.png',
      // Agrega más rutas de imágenes aquí
    ];

    // Cargamos las imágenes y las convertimos a base64
    const promises = imageUrls.map((url) =>
      fetch(url)
        .then((response) => response.blob())
        .then((blob) => {
          const reader = new FileReader();
          return new Promise<string>((resolve) => {
            reader.onloadend = () => {
              const base64 = reader.result as string;
              resolve(base64);
            };
            reader.readAsDataURL(blob);
          });
        })
    );

    // Esperamos a que todas las imágenes se hayan cargado y convertido a base64
    Promise.all(promises).then((base64Images) => {
      this.createPDF(base64Images); // Llamamos a la función para crear el PDF
    });
  }

  createPDF(base64Images: string[]) {
    const tableBody = base64Images.map((base64) => [
      { image: base64, width: 100, height: 100 },
    ]);

    const documentDefinition = {
      content: [
        {
          text: 'Catalogo',
          fontSize: 24,
          bold: true,
          alignment: 'center',
          margin: [0, 5],
        },
        {
          style: 'tableExample',
          table: {
            widths: ['auto', 'auto', 'auto'],
            body: [
              tableBody,
            ],
          },
        },
      ],
    };

    pdfMake.createPdf(documentDefinition).open();
  }
}
 
  
  

