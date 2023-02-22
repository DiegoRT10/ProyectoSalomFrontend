import { Movimientos2, ProductoCode, productsViewProducts } from './../../services/products.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbTypeahead, NgbTypeaheadModule } from '@ng-bootstrap/ng-bootstrap';
import { Observable, Subject, merge, OperatorFunction } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, map } from 'rxjs/operators';
import { FormsModule } from '@angular/forms';
import { JsonPipe } from '@angular/common';
import { LocationsId, Movimientos, Products, ProductsService, ViewProducts, ViewProducts2 } from '../../services/products.service';
import { DetalleTraslado, Traslado, TrasladoService } from '../../services/traslado.service';
import * as moment from 'moment';
import { Administrador, Farmacia, VentaDiariaService } from '../../services/venta-diaria.service';
import decode from 'jwt-decode';



@Component({
  selector: 'app-movimientos-administrador',
  templateUrl: './movimientos-administrador.component.html',
  // standalone: true,
  // imports: [NgbTypeaheadModule, FormsModule, JsonPipe],
  styleUrls: ['./movimientos-administrador.component.css']
})
export class MovimientosAdministradorComponent implements OnInit{
  
  date: Date = new Date();
  blob!:Blob;
  product = [''];
  state = [''];
  tableMovimiento?:Movimientos[];
  model!: string;
  model2: any;
  model3: any;
  idProd:string='';
  CadenaMovimiento = [''];
  DatosMovimiento = [''];
  cadena:string ='';
  sic = 0;
  sfc = 0;
  sil = 0;
  sfl = 0;
  sica = 0;
  sfca = 0;
  fechaDia!: string;


  ListaProductos?:Products[];
  ListaViewsProducts?:ViewProducts[];
  ListaProductsCodeName?:ViewProducts2[];
  ListaLocationsId?:LocationsId[];
  ListaMovimientos: Movimientos2[] = [];
  ListaMov:Array<any> =[];
  ListaTraslados?:Traslado[];
  ListaDetalleTRaslado?:DetalleTraslado[];
  ListaProductsViewProducts?:productsViewProducts[];
  ListaPeopleLocation?:Administrador[];
  ListaFarmacia?:Farmacia[];
  
  

  ObjectViewProducts:ViewProducts={
    id:'',
    codigopf:'',
    bono:0,
    codin:'',
    nombre:'',
    uom:'',
    costo:0,
    precio:0,
    margen:0,
    supplier:'',
  }

  ObjetcCadenaProduct:ViewProducts2={
    code_name:''
  }
  
  ObjectMovimientos:Movimientos={
    idProducto: '',
    idLocation: '',
    cantidad: 0
  }

  ObjectMovimientos2:Movimientos2={
    idProducto:'',
    idLocation:'',
    cantidad:0
  }

  ObjectNotaTraslado:Traslado={
    id:"",
    id_encargado:"", 
    id_autorizado:"", 
    no:0, 
    fecha:this.date, 
    id_location_origen:"", 
    id_location_destino:"", 
    motivo:"", 
    estado:""
  }

  ObjectDetalleTraslado:DetalleTraslado={
    id: '',
    id_nota_traslado: '',
    id_producto: '',
    cantidad: 0,
    estado: 0
  }

  ObjectProduct:Products={
    id: '',
    reference: '',
    code: '',
    codetype: '',
    name: '',
    pricebuy: 0,
    pricesell: 0,
    category: '',
    taxcat: 0,
    attributeset_id: '',
    stockcost: 0,
    stockvolumen: 0,
    image: this.blob,
    iscom: undefined,
    isscale: undefined,
    isconstant: undefined,
    printkb: undefined,
    sendstatus: undefined,
    isservice: undefined,
    attributes: this.blob,
    display: '',
    isvprice: 0,
    isverpatrib: 0,
    texttip: '',
    warranty: 0,
    stockunits: 0,
    printto: '',
    supplier: '',
    uom: '',
    memodate: undefined,
    concentracion: '',
    forma: '',
    codigopf: '',
    updated: undefined,
    bono: 0,
    visible: 0
  }

  ObjectProductsViewProducts:productsViewProducts ={
    code: '',
    id: '',
    codigopf: '',
    bono: 0,
    codin: '',
    nombre: '',
    uom: '',
    costo: 0,
    precio: 0,
    margen: 0,
    supplier: '',
    taxcat: '',
    visible: 0
  }


  ObjectProductoCode:ProductoCode={
    code: ''
  }

  ObjectPeopleLocation:Administrador={
    id: ''
  }

  ObjectFarmacia:Farmacia={
    id: ''
  }
  

  constructor( private products:ProductsService, private trasladoService:TrasladoService, private ventaDiariaService: VentaDiariaService) { }

  ngOnInit(): void {
    // this.getProducts();
    this.fechaDia = moment.utc(this.date).format('yyyy-MM-DD');
    this.ObjectNotaTraslado.fecha = this.fechaDia;
    console.log(this.fechaDia);
    this.getProductsCodeName();
    this.getLocationsId();
    this.getPeopleLocation();
  }


   
    
  


  getProducts(): void {
    this.products.getViewsProducts().subscribe(res => {
      this.ObjectViewProducts = <any>res;
      this.ListaViewsProducts = <any>res;
      
    },
      err => {
        console.log(err);
      }

    );
  }

  getProductsCodeName(): void {
    this.products.getViewsProductsCodeName().subscribe(res => {
      this.ListaProductsCodeName = <any>res;

      for (const i of this.ListaProductsCodeName!) {
        this.product.push( <any>i.code_name);
         
      }
      
    },
      err => {
        console.log(err);
      }

    );
  }

  SaveNotaTraslado():void{
    

    this.trasladoService.addNotaTraslado(this.ObjectNotaTraslado).subscribe(
      res => {
        console.log('Se agrego el deposito correctamente');
      },
      err => {
        console.log(err);
      });

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
				(term === '' ? this.product : this.product.filter((v) => v.toLowerCase().indexOf(term.toLowerCase()) > -1)).slice(0, 10),
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

  @ViewChild('instance', { static: true }) instance2: NgbTypeahead | undefined;
	focus2$ = new Subject<string>();
	click2$ = new Subject<string>();

	search2: OperatorFunction<string, readonly string[]> = (text2$: Observable<string>) => {
		const debouncedText$ = text2$.pipe(debounceTime(200), distinctUntilChanged());
		const clicksWithClosedPopup$ = this.click2$.pipe(filter(() => this.instance!.isPopupOpen()));
		const inputFocus$ = this.focus2$;
   

		return merge(debouncedText$, inputFocus$, clicksWithClosedPopup$).pipe(
			map((term) =>
				(term === '' ? this.state : this.state.filter((v) => v.toLowerCase().indexOf(term.toLowerCase()) > -1)).slice(0, 10),
			),
		);
	};




  @ViewChild('instance', { static: true }) instance3: NgbTypeahead | undefined;
	focus3$ = new Subject<string>();
	click3$ = new Subject<string>();

	search3: OperatorFunction<string, readonly string[]> = (text3$: Observable<string>) => {
		const debouncedText$ = text3$.pipe(debounceTime(200), distinctUntilChanged());
		const clicksWithClosedPopup$ = this.click3$.pipe(filter(() => this.instance!.isPopupOpen()));
		const inputFocus$ = this.focus3$;
   

		return merge(debouncedText$, inputFocus$, clicksWithClosedPopup$).pipe(
			map((term) =>
				(term === '' ? this.state : this.state.filter((v) => v.toLowerCase().indexOf(term.toLowerCase()) > -1)).slice(0, 10),
			),
		);
	};


  MoverProducto():void{


    for (let i = 0; i < this.model.length; i++) {
      let ascii = this.model.toUpperCase().charCodeAt(i);
      
      if(!(ascii > 64 && ascii < 91)){
       if(!(this.model.charAt(i) == ' ')){
        this.ObjectMovimientos.idProducto += this.model.charAt(i); 
       }else{break;}
      }else{break;}
    }
   
    
    console.log('Producto a mover ', this.ObjectMovimientos.idProducto);
    console.log('Farmacia origen ', this.ObjectNotaTraslado.id_location_origen);
    console.log('Farmacia destino', this.ObjectNotaTraslado.id_location_destino);
    console.log('Cantida de producto ',this.ObjectMovimientos.cantidad);
    console.log('Objeto a anadir ',this.ObjectMovimientos);

    this.ObjectProductoCode.code = <any>this.ObjectMovimientos.idProducto;
    this.products.searchProductoCode(this.ObjectProductoCode).subscribe(res => {
    this.ObjectProductsViewProducts = res[0];
    console.log("producto "+ this.ObjectProductsViewProducts.id);
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

    this.ventaDiariaService.PeopleLocation(this.ObjectPeopleLocation).subscribe(res => {
      this.ObjectFarmacia = res[0];
      

      console.log("El usuario "+this.ObjectPeopleLocation.id+" pertenece a "+this.ObjectFarmacia.id);
      this.ObjectNotaTraslado.id_location_origen = this.ObjectFarmacia.id;
      
    },
      err => {
        console.log(err);
      }

    );
  }


Limpiar():void{
  this.ObjectMovimientos.idProducto =''; 
  this.ObjectMovimientos.idLocation =''; 
  this.ObjectMovimientos.cantidad =0; 
}


  DatosTable():void{

    const table = document.getElementById("rwd-table-id") as HTMLTableElement;
   for (let i = 0, row; row = table.rows[i]; i++) {
      console.log('dato table ',row);
    }
  }

  




   

}




/**this.DatosMovimiento.push(`${this.ObjectMovimientos.idProducto}`);   
      this.DatosMovimiento.push(`${this.ObjectMovimientos.idLocation}`); 
      this.DatosMovimiento.push(`${this.ObjectMovimientos.cantidad}`);
   
    this.cadena = this.ObjectMovimientos.idProducto+' '+this.ObjectMovimientos.idLocation+' '+this.ObjectMovimientos.cantidad;
    //this.cadena = `${this.ObjectMovimientos.idProducto}' '${this.ObjectMovimientos.idLocation}' '${this.ObjectMovimientos.cantidad}`
    console.log('cadena ', this.cadena);

    if(this.CadenaMovimiento.push(this.cadena)){
      console.log('Lista Movimientos ',this.CadenaMovimiento);
      this.Limpiar();
    }

    
      let codigo = '';
      let location = '';
      let cantidad = '';

    
    for (let i = 0; i < this.CadenaMovimiento.length; i++) { //recorro cadena con valores de idProducto, 
      let cadena = this.CadenaMovimiento[i];
      
      for(let j = 0; j < cadena.length; j++){
        if(cadena.charAt(j) != ' '){
          codigo += cadena.charAt(j)
        }else{
          this.sic = 0;
          this.sfc = j;
          break;} 
      }
      for(let k = codigo.length+1; k < cadena.length; k++){
        if(cadena.charAt(k) != ' '){
          location += cadena.charAt(k)
        }else{
          this.sil = codigo.length+1;
          this.sfl = k;
          break;}  
      }
      for(let m = codigo.length+location.length+2; m < cadena.length; m++){
        if(cadena.charAt(m) != ' '){
          cantidad += cadena.charAt(m)
        }else{break;}  
          this.sica = codigo.length+location.length+2;
          this.sfca = cadena.length;
          console.log('tamano inicio cantidad '+this.sica);
          console.log('tamano fin cantidad '+this.sfca);
      }
      console.log('cadena codigo '+codigo);
      console.log('cadena location '+location);
      console.log('cadena cantidad '+cantidad);

      this.ObjectMovimientos2.idProducto = codigo; 
      this.ObjectMovimientos2.idLocation = location; 
      this.ObjectMovimientos2.cantidad = <any>cantidad; 

      
      
      
    
    }

    // if(this.ListaMovimientos.push(this.ObjectMovimientos)){
    //   console.log('Lista Movimientos ',this.ListaMov);
    // } */