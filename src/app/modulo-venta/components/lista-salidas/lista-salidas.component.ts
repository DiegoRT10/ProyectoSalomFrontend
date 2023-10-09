import { Movimientos2, ProductoCode, productsViewProducts } from './../../services/products.service';
import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { NgbTypeahead, NgbTypeaheadModule } from '@ng-bootstrap/ng-bootstrap';
import { Observable, Subject, merge, OperatorFunction } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, map } from 'rxjs/operators';
import { FormsModule } from '@angular/forms';
import { JsonPipe } from '@angular/common';
import { LocationsId, Movimientos, Products, ProductsService, ViewProducts, ViewProducts2 } from '../../services/products.service';
import { DetalleTraslado, IdDetalleTraslado, ProductosTraslado, Traslado, TrasladoService } from '../../services/traslado.service';
import * as moment from 'moment';
import { Administrador, Farmacia, PeopleLocation, VentaDiariaService } from '../../services/venta-diaria.service';
import decode from 'jwt-decode';
import { Router } from '@angular/router';

@Component({
  selector: 'app-lista-salidas',
  templateUrl: './lista-salidas.component.html',
  styleUrls: ['./lista-salidas.component.css']
})
export class ListaSalidasComponent {
  date: Date = new Date();
  bandera:boolean = true;
  estado!:number;
  estado2:string ="";
  estado3:string =""

  state = [''];
  listaOp: String[] = ['Creados','Pendientes','Autorizados','Salientes', 'Entrantes', 'Finalizado'];

  ListaNotaTraslado!:Traslado[];
  ListaPeopleLocation2?: PeopleLocation[];
  ListaLocationsId?:LocationsId[];
  ListaProductosTraslado?: ProductosTraslado[];
  ListaTrasladosPendientes: Traslado[];
  items = ['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5'];
  expandedIndex = 0;

  searchPeople = [''];

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

  people: PeopleLocation = {
    id: '',
    name: '',
    apppassword: '',
    card: 0,
    role: 0,
    visible: 0,
    image: '',
    auditor: 0,
    token: '',
    tokenLife: '',
    idpeople: '',
    idlocation: '',
    meta: 0,
    nivel: 0,
    dia: 0
  }



  ObjectDetalleTrasladoId:IdDetalleTraslado={
    id: '',
    estado:1
  }

  ObjectPeopleLocation:Administrador={
    id: ''
  }

  
  ObjectFarmacia:Farmacia={
    id: ''
  }
  carga?: boolean;

 constructor( private products:ProductsService, private trasladoService:TrasladoService, private ventaDiariaService: VentaDiariaService, private router: Router, private cdr: ChangeDetectorRef ) {}


 ngOnInit(): void {
  this.carga = true;
  this.getPeopleLocation();
  this.getLocationsId();
  this.pendienteTraslado();
 }

 ngAfterViewInit() {
  this.carga = false;
}


 @ViewChild('instance', { static: true }) instance: NgbTypeahead | undefined;
 focus$ = new Subject<string>();
 click$ = new Subject<string>();

 search: OperatorFunction<string, readonly string[]> = (text$: Observable<string>) => {
   const debouncedText$ = text$.pipe(debounceTime(200), distinctUntilChanged());
   const clicksWithClosedPopup$ = this.click$.pipe(filter(() => this.instance!.isPopupOpen()));
   const inputFocus$ = this.focus$;
  

   return merge(debouncedText$, inputFocus$, clicksWithClosedPopup$).pipe(
     map((term) =>
       (term === '' ? this.state : this.state.filter((v) => v.toLowerCase().indexOf(term.toLowerCase()) > -1)).slice(0, 10),
     ),
   );
 };


 getLocationsId(): void {
  this.products.getLocationsId().subscribe(res => {
    this.ListaLocationsId = <any>res;

    for (const i of this.ListaLocationsId!) {
      this.state.push( <any>i.id);
      
    }
    
  },
    err => {
      console.log(err);
    }

  );
}




 getDetalleTraslado(){
  this.ObjectDetalleTrasladoId.id = this.ObjectFarmacia.id;
  this.trasladoService.searchDetalleTraslado2(this.ObjectDetalleTrasladoId).subscribe(res => {
    this.ListaNotaTraslado = res;
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

  this.ObjectPeopleLocation.id = decodeToken.id
  this.ObjectNotaTraslado.id_entrega = decodeToken.id;
  this.ventaDiariaService.PeopleLocation(this.ObjectPeopleLocation).subscribe(res => {
    this.ObjectFarmacia = res[0];
    
    this.ObjectNotaTraslado.id_location_origen = this.ObjectFarmacia.id;
    this.bandera = false;
    this.getTraslado('Pendientes');
    this.estado = 1;
    this.estado2 = "Pendientes";

  },
    err => {
      console.log(err);
    }

  );
}

ActualizaInputRecibe():void{
  this.people.idlocation = this.ObjectNotaTraslado.id_location_destino;
  this.ObjectFarmacia.id = this.people.idlocation;
  this.bandera = false;
  this.getTraslado('Pendientes');
  this.estado = 1;
  this.estado2 = "Pendientes";
}

ActualizaInputRecibe2():void{
  this.people.idlocation = this.ObjectNotaTraslado.id_location_destino;
  this.ObjectFarmacia.id = this.people.idlocation;
  this.bandera = false;
  this.estado = 2;
  this.estado2 = "Autorizados";
  this.getTraslado('Autorizados');
}

setRevisado(id:string){
  location.reload();
  this.ObjectDetalleTrasladoId.id = id;
  this.ObjectDetalleTrasladoId.estado = 2;

    this.trasladoService.updateTraslado(this.ObjectDetalleTrasladoId).subscribe(res => {
      this.ActualizaInputRecibe2();
      this.cdr.detectChanges();
    },
      err => {
        console.log(err);
      }
  
    );
   
}


getTraslado(data:any){
  let op;
  this.bandera ?  op = data.target.value: op = data

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

getProductosTraslado(id: string) {
  this.ObjectDetalleTrasladoId.id = id;
  console.log('este es el id del traslado que se esta buscabdo ', this.ObjectDetalleTrasladoId.id);
  this.trasladoService.searchProductosTraslado(this.ObjectDetalleTrasladoId).subscribe(res => {
    this.ListaProductosTraslado = res;
  },
    err => {
      console.log(err);
    }

  );

}

pendienteTraslado(){
  this.trasladoService.getPendientesTraslados().subscribe(res => {
    this.ListaTrasladosPendientes = <any>res;
    console.log('estos son los objetos pendientes: ',this.ListaTrasladosPendientes.map(item => item.id_location_origen));
  }, err => {
    console.log(err)
  });
}


}
