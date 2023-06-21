import { Component } from '@angular/core';
import { Inventario, ProductoId, ProductsService } from '../../services/products.service';
import decode from 'jwt-decode';
import { Administrador, Farmacia, VentaDiariaService } from '../../services/venta-diaria.service';

@Component({
  selector: 'app-inventario-farmacia',
  templateUrl: './inventario-farmacia.component.html',
  styleUrls: ['./inventario-farmacia.component.css']
})
export class InventarioFarmaciaComponent {

  carga?: boolean;
  flag?:boolean;
  filtroNombre?: string;


  ListaInvetario?:Inventario[];

  
  ObjectPeopleLocation:Administrador={
    id: ''
  }

  ObjectFarmacia:Farmacia={
    id: ''
  }

  constructor(private products:ProductsService, private ventaDiariaService: VentaDiariaService) {
    this.flag = true;
  }
 
 
  ngOnInit(): void {
   this.carga = true;
   this.getLocationsId();
  }
 
  ngAfterViewInit() {
   this.carga = false;
 }

 

  




 getLocationsId(): void {
  const token = localStorage.getItem('token');
  let decodeToken:any = {}
  decodeToken = decode(token || '');

  this.ObjectPeopleLocation.id = decodeToken.id
  this.ventaDiariaService.PeopleLocation(this.ObjectPeopleLocation).subscribe(res => {
    this.ObjectFarmacia = res[0];
    this.products.getInventarioFarmacia(this.ObjectFarmacia).subscribe(res => {
      this.ListaInvetario = <any>res;
      this.flag = false;
    },
      err => {
        console.log(err);
      }
  
    );


  },
    err => {
      console.log(err);
      return null;
    }

  );
}




}
