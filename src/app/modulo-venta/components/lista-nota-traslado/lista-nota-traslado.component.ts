import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DetalleTraslado, IdDetalleTraslado, ProductosTraslado, stockCurrent, stockDiary, Traslado, TrasladoService, Traslado_Detalle } from '../../services/traslado.service';
import { Administrador, Farmacia, VentaDiariaService } from '../../services/venta-diaria.service';
import decode from 'jwt-decode';
import { PriceSell, ProductoId, ProductsService } from '../../services/products.service';

@Component({
  selector: 'app-lista-nota-traslado',
  templateUrl: './lista-nota-traslado.component.html',
  styleUrls: ['./lista-nota-traslado.component.css']
})
export class ListaNotaTrasladoComponent {

  date: Date = new Date();
  decodeToken: any = {}
  bandera: boolean = true;
  estado!: number;
  estado2:string ="Creados";
  estado3:string =""
  idFarmacia:string ="";
  abrir:boolean = false;

  // ListaNotaTraslado!: Traslado[];
  ListaNotaTraslado!: Traslado_Detalle[];
  ListaDetalleTraslado?: DetalleTraslado[];
  ListaProductosTraslado?: ProductosTraslado[];
  listaOp: String[] = ['Creados', 'Pendientes', 'Autorizados', 'Salientes', 'Entrantes','Finalizado'];

  ObjectStockDiary: stockDiary = {
    id: '',
    datenew: this.date,
    reason: '',
    location: '',
    product: '',
    units: 0,
    price: 0,
    appuser: '',
    supplier: ''
  }

  ObjectStockCurrent: stockCurrent = {
    units: 0,
    location: '',
    product: ''
  }

  ObjectNotaTraslado: Traslado = {
    id: '',
    id_entrega: '',
    id_recibe: '',
    id_encargado: '',
    id_autorizado: '',
    no: 0,
    fecha: this.date,
    id_location_origen: '',
    id_location_destino: '',
    motivo: '',
    estado: 0
  }

  ObjectDetalleTrasladoId: IdDetalleTraslado = {
    id: '',
    estado: 0
  }

  ObjectPeopleLocation: Administrador = {
    id: ''
  }


  ObjectFarmacia: Farmacia = {
    id: ''
  }

  ObjectProduct: PriceSell = {
    id: "",
    pricesell: 0
  }

  ObjectProducto: ProductoId = {
    id: ''
  }
  carga?: boolean;

  constructor(private trasladoService: TrasladoService, private ventaDiariaService: VentaDiariaService, private router: Router, private productService: ProductsService) { }


  ngOnInit(): void {
    this.carga = true;
    this.getPeopleLocation();
  }

  ngAfterViewInit() {
    this.carga = false;
  }



  insertStockDiaryOrigen(idTraslado: string, destino: string) {

    this.ObjectDetalleTrasladoId.id = idTraslado;
    this.trasladoService.searchDetalleTraslado(this.ObjectDetalleTrasladoId).subscribe(res => {
      this.ListaDetalleTraslado = res;
      this.ObjectStockDiary.id = '';
      // this.ObjectStockDiary.datenew = this.date;

      for (const i of this.ListaDetalleTraslado!) {

        this.ObjectStockDiary.reason = "-8";
        this.ObjectStockDiary.location = this.ObjectFarmacia.id;
        this.ObjectStockDiary.product = i.id_producto;
        this.ObjectStockDiary.units = i.cantidad;
        this.ObjectStockDiary.appuser = this.decodeToken.id;
        this.ObjectStockDiary.supplier = destino;

        this.ObjectProducto.id = i.id_producto;
        this.productService.searchPriceSell(this.ObjectProducto).subscribe(res => {
          this.ObjectProduct = res[0];
          this.ObjectStockDiary.price = this.ObjectProduct.pricesell;
          this.ObjectStockDiary.product = this.ObjectProduct.id;
          this.trasladoService.addStockDiary(this.ObjectStockDiary).subscribe(
            res => {


              this.ObjectStockCurrent.units = i.cantidad;
              this.ObjectStockCurrent.location = this.ObjectFarmacia.id;
              this.ObjectStockCurrent.product = i.id_producto;
              this.trasladoService.updateStockCurrentOrigen(this.ObjectStockCurrent).subscribe(res => {

              

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
        },
          err => {
            console.log(err);
          }

        );

      }

      this.ObjectDetalleTrasladoId.id = idTraslado;
      this.ObjectDetalleTrasladoId.estado = 3;
        this.trasladoService.updateTraslado(this.ObjectDetalleTrasladoId).subscribe(res => {
          this.ActualizaInputRecibe();
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

  insertStockDiaryDestino(idTraslado: string, destino: string) {

    this.ObjectDetalleTrasladoId.id = idTraslado;
    this.trasladoService.searchDetalleTraslado(this.ObjectDetalleTrasladoId).subscribe(res => {
      this.ListaDetalleTraslado = res;
      this.ObjectStockDiary.id = '';
      // this.ObjectStockDiary.datenew = this.date;

      for (const i of this.ListaDetalleTraslado!) {

        this.ObjectStockDiary.reason = "8";
        this.ObjectStockDiary.location = this.ObjectFarmacia.id;
        this.ObjectStockDiary.product = i.id_producto;
        this.ObjectStockDiary.units = i.cantidad;
        this.ObjectStockDiary.appuser = this.decodeToken.id;
        this.ObjectStockDiary.supplier = destino;

        this.ObjectProducto.id = i.id_producto;
        this.productService.searchPriceSell(this.ObjectProducto).subscribe(res => {
          this.ObjectProduct = res[0];
          this.ObjectStockDiary.price = this.ObjectProduct.pricesell;
          this.ObjectStockDiary.product = this.ObjectProduct.id;
          this.trasladoService.addStockDiary(this.ObjectStockDiary).subscribe(
            res => {


              this.ObjectStockCurrent.units = i.cantidad;
              this.ObjectStockCurrent.location = this.ObjectFarmacia.id;
              this.ObjectStockCurrent.product = i.id_producto;
              this.trasladoService.updateStockCurrentDestino(this.ObjectStockCurrent).subscribe(res => {

              

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
        },
          err => {
            console.log(err);
          }

        );

      }

      this.ObjectDetalleTrasladoId.id = idTraslado;
      this.ObjectDetalleTrasladoId.estado = 4;
        this.trasladoService.updateTraslado(this.ObjectDetalleTrasladoId).subscribe(res => {
          this.ActualizaInputRecibe2();
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





  getTraslado(data: any) {
    let op;
    this.bandera ? op = data.target.value : op = data




    switch (op) {
      case 'Creados': this.estado = 0
      this.estado3="Salientes";
        break;
      case 'Pendientes': this.estado = 1
      this.estado3="Salientes";
        break;
      case 'Autorizados': this.estado = 2
      this.estado3="Salientes";
        break;
      case 'Salientes': this.estado = 3
                        this.estado3="Salientes";
        break;
      case 'Entrantes': this.estado = 3
                        this.estado3="Entrantes";
        break;
      case 'Finalizado': this.estado = 4;
                        this.estado3="Finalizado";
    }



    this.ObjectDetalleTrasladoId.id = this.ObjectFarmacia.id;
    this.ObjectDetalleTrasladoId.estado = <any>this.estado;

    if(this.estado <=3 && this.estado3=="Salientes"){
      this.trasladoService.searchDetalleTraslado2(this.ObjectDetalleTrasladoId).subscribe(res => {
        this.ListaNotaTraslado = res;
        this.bandera = true;
      },
        err => {
          console.log(err);
        }
  
      );

    }
    if(this.estado ==3 && this.estado3=="Entrantes"){
      this.trasladoService.searchDetalleTraslado3(this.ObjectDetalleTrasladoId).subscribe(res => {
        this.ListaNotaTraslado = res;
        this.bandera = true;
      },
        err => {
          console.log(err);
        }
  
      );

    }
    if(this.estado ==4 && this.estado3=="Finalizado"){
      this.trasladoService.searchDetalleTraslado4(this.ObjectDetalleTrasladoId).subscribe(res => {
        this.ListaNotaTraslado = res;
        this.bandera = true;
      },
        err => {
          console.log(err);
        }
  
      );

    }
    
  }


  getPeopleLocation(): void {
    const token = localStorage.getItem('token');
    this.decodeToken = decode(token || '');
    this.ObjectPeopleLocation.id = this.decodeToken.id
    this.ObjectNotaTraslado.id_entrega = this.decodeToken.id;
    this.ventaDiariaService.PeopleLocation(this.ObjectPeopleLocation).subscribe(res => {
      this.ObjectFarmacia = res[0];

      this.idFarmacia =  this.ObjectFarmacia.id;
      this.ObjectNotaTraslado.id_location_origen = this.ObjectFarmacia.id;
      this.bandera = false;
      this.getTraslado('Creados');


    },
      err => {
        console.log(err);
      }

    );
  }

  getDetalleTraslado(id: string) {
    this.ObjectDetalleTrasladoId.id = id;
    this.trasladoService.searchDetalleTraslado(this.ObjectDetalleTrasladoId).subscribe(res => {
      this.ListaDetalleTraslado = res;
    },
      err => {
        console.log(err);
      }

    );

  }

  tipoTraslado(data: any) {
    data.target.value = 'Salientes' ? this.bandera = true : this.bandera = false;
  }

  ActualizaInputRecibe():void{
    
    this.bandera = false;
    this.estado = 3;
    this.estado2 = "Salientes";
    this.getTraslado('Salientes');
  }


  ActualizaInputRecibe2():void{
    
    this.bandera = false;
    this.estado = 4;
    this.estado2 = "Finalizado";
    this.getTraslado('Finalizado');
  }

  Abrir(flag:boolean){
    this.abrir = flag
  }


  getProductosTraslado(id: string) {
    this.ObjectDetalleTrasladoId.id = id;
    this.trasladoService.searchProductosTraslado(this.ObjectDetalleTrasladoId).subscribe(res => {
      this.ListaProductosTraslado = res;
    },
      err => {
        console.log(err);
      }

    );

  }

}
