import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DetalleTraslado, IdDetalleTraslado, stockDiary, Traslado, TrasladoService } from '../../services/traslado.service';
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
  decodeToken:any = {}
  
  ListaNotaTraslado!:Traslado[];
  ListaDetalleTraslado?:DetalleTraslado[];
  
  
  ObjectStockDiary:stockDiary={
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

  ObjectNotaTraslado:Traslado={
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

  ObjectDetalleTrasladoId:IdDetalleTraslado={
    id: ''
  }

  ObjectPeopleLocation:Administrador={
    id: ''
  }

  
  ObjectFarmacia:Farmacia={
    id: ''
  }

  ObjectProduct:PriceSell={
    pricesell: 0
  }

  ObjectProducto:ProductoId={
    id: ''
  }

 constructor( private trasladoService:TrasladoService, private ventaDiariaService: VentaDiariaService, private router: Router, private productService: ProductsService ) {}


 ngOnInit(): void {
  this.getPeopleLocation();
 }




insertStockDiary(idTraslado:string,destino:string){
  this.getDetalleTraslado(idTraslado);
  this.ObjectStockDiary.id = '';
  // this.ObjectStockDiary.datenew = this.date;

  for (const i of this.ListaDetalleTraslado!) {
    
  this.ObjectStockDiary.reason = "-8";
  this.ObjectStockDiary.location= this.ObjectFarmacia.id;
  this.ObjectStockDiary.product= i.id_producto;
  this.ObjectStockDiary.units= i.cantidad;
  this.ObjectStockDiary.appuser= this.decodeToken.id;
  this.ObjectStockDiary.supplier=destino;
    
  this.ObjectProducto.id = i.id_producto;
  console.log("id producto ", this.ObjectProducto.id);
  this.productService.searchPriceSell(this.ObjectProducto).subscribe(res => {
    this.ObjectProduct = res[0];
    this.ObjectStockDiary.price=this.ObjectProduct.pricesell;
    console.log("precio ",this.ObjectStockDiary.price);
    this.trasladoService.addStockDiary(this.ObjectStockDiary).subscribe(
      res => {
        console.log("Datos enviados");
      },
      err =>{
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


getTraslado(){
  this.ObjectDetalleTrasladoId.id = this.ObjectFarmacia.id;
  this.trasladoService.searchDetalleTraslado2(this.ObjectDetalleTrasladoId).subscribe(res => {
    console.log("Datos enviados");
    this.ListaNotaTraslado = res;
    console.log("detalle traslado +",this.ListaNotaTraslado);
  },
    err => {
      console.log(err);
    }

  );
}


getPeopleLocation(): void {
  const token = localStorage.getItem('token');
  this.decodeToken = decode(token || '');

  console.log("tocken "+this.decodeToken.id);
  this.ObjectPeopleLocation.id = this.decodeToken.id
  this.ObjectNotaTraslado.id_entrega = this.decodeToken.id;
  this.ventaDiariaService.PeopleLocation(this.ObjectPeopleLocation).subscribe(res => {
    this.ObjectFarmacia = res[0];


    console.log("El usuario "+this.ObjectPeopleLocation.id+" pertenece a "+this.ObjectFarmacia.id);
    this.ObjectNotaTraslado.id_location_origen = this.ObjectFarmacia.id;
    this.getTraslado();
  },
    err => {
      console.log(err);
    }

  );
}

getDetalleTraslado(id:string){
  this.ObjectDetalleTrasladoId.id = id;
  this.trasladoService.searchDetalleTraslado(this.ObjectDetalleTrasladoId).subscribe(res => {
    console.log("Datos enviados");
    this.ListaDetalleTraslado = res;
    console.log("detalle traslado1",this.ListaDetalleTraslado);
  },
    err => {
      console.log(err);
    }

  );

}


  





}
