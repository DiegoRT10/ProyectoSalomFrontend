import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { IdDetalleTraslado, Traslado, TrasladoService } from '../../services/traslado.service';
import { Administrador, Farmacia, VentaDiariaService } from '../../services/venta-diaria.service';
import decode from 'jwt-decode';

@Component({
  selector: 'app-lista-nota-traslado',
  templateUrl: './lista-nota-traslado.component.html',
  styleUrls: ['./lista-nota-traslado.component.css']
})
export class ListaNotaTrasladoComponent {

  date: Date = new Date();
  
  ListaNotaTraslado!:Traslado[];

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

 constructor( private trasladoService:TrasladoService, private ventaDiariaService: VentaDiariaService, private router: Router ) {}


 ngOnInit(): void {
  this.getPeopleLocation();
 }





 getDetalleTraslado(){
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
  let decodeToken:any = {}
  decodeToken = decode(token || '');

  console.log("tocken "+decodeToken.id);
  this.ObjectPeopleLocation.id = decodeToken.id
  this.ObjectNotaTraslado.id_entrega = decodeToken.id;
  this.ventaDiariaService.PeopleLocation(this.ObjectPeopleLocation).subscribe(res => {
    this.ObjectFarmacia = res[0];
    

    console.log("El usuario "+this.ObjectPeopleLocation.id+" pertenece a "+this.ObjectFarmacia.id);
    this.ObjectNotaTraslado.id_location_origen = this.ObjectFarmacia.id;
    this.getDetalleTraslado();
  },
    err => {
      console.log(err);
    }

  );
}


isNumber(num:number):boolean{
return !isNaN(num);
}

}
