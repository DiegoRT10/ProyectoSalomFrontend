import { Movimientos2, ProductoCode, productsViewProducts } from './../../services/products.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbTypeahead, NgbTypeaheadModule } from '@ng-bootstrap/ng-bootstrap';
import { Observable, Subject, merge, OperatorFunction } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, map } from 'rxjs/operators';
import { FormsModule } from '@angular/forms';
import { JsonPipe } from '@angular/common';
import { LocationsId, Movimientos, Products, ProductsService, ViewProducts, ViewProducts2 } from '../../services/products.service';
import { DetalleTraslado, IdDetalleTraslado, IdDetalleTraslado1, Traslado, TrasladoService } from '../../services/traslado.service';
import * as moment from 'moment';
import { Administrador, Farmacia, PeopleLocation, VentaDiariaService } from '../../services/venta-diaria.service';
import decode from 'jwt-decode';
import { Router } from '@angular/router';

@Component({
  selector: 'app-detalle-nota-traslado',
  templateUrl: './detalle-nota-traslado.component.html',
  styleUrls: ['./detalle-nota-traslado.component.css']
})
export class DetalleNotaTrasladoComponent {
  date: Date = new Date();
  blob!:Blob;
  product = [''];
  state = [''];
  searchPeople = [''];
  tableMovimiento?:Movimientos[];
  model!: string;
  model2: any;
  model3: any;
  idProd:string='';
  CadenaMovimiento = [''];
  DatosMovimiento = [''];
  cadena:string ='';
  fechaDia!: string;
  inputDestino:any;
  bandera?:boolean;
  


  ListaProductos?:Products[];
  ListaViewsProducts?:ViewProducts[];
  ListaProductsCodeName?:ViewProducts2[];
  ListaTraslados?:Traslado[];
  ListaDetalleTraslado?:DetalleTraslado[];
  ListaProductsViewProducts?:productsViewProducts[];

  
  

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
    id: '',
    code:'',
    nombre:'',
    code_name: ''
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



  ObjectProductoCode:ProductoCode={
    code: ''
  }

  ObjectPeopleLocation:Administrador={
    id: ''
  }

  ObjectFarmacia:Farmacia={
    id: ''
  }
  
  ObjectDetalleTrasladoId:IdDetalleTraslado1={
    id: '',
    estado: 0
  }
  carga?: boolean;

  constructor( private products:ProductsService, private trasladoService:TrasladoService, private ventaDiariaService: VentaDiariaService, private router: Router) { }

  ngOnInit(): void {
    this.carga = true;
    // this.getProducts();
    this.fechaDia = moment.utc(this.date).format('yyyy-MM-DD');
    this.ObjectNotaTraslado.fecha = <any>this.fechaDia;
    this.getProductsCodeName();
    this.getPeopleLocation();
    this.getDetalleTraslado();
  }

  ngAfterViewInit() {
    this.carga = false;
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

  SaveDetalleNotaTraslado():void{
    

    this.trasladoService.addDetalleNotaTraslado(this.ObjectNotaTraslado).subscribe(
      res => {
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



  @ViewChild('instance', { static: true }) instance2: NgbTypeahead | undefined;
	focus2$ = new Subject<string>();
	click2$ = new Subject<string>();

	search2: OperatorFunction<string, readonly string[]> = (text2$: Observable<string>) => {
		const debouncedText$ = text2$.pipe(debounceTime(200), distinctUntilChanged());
		const clicksWithClosedPopup$ = this.click2$.pipe(filter(() => this.instance2!.isPopupOpen()));
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
		const clicksWithClosedPopup$ = this.click3$.pipe(filter(() => this.instance3!.isPopupOpen()));
		const inputFocus$ = this.focus3$;
   

		return merge(debouncedText$, inputFocus$, clicksWithClosedPopup$).pipe(
			map((term) =>
				(term === '' ? this.state : this.state.filter((v) => v.toLowerCase().indexOf(term.toLowerCase()) > -1)).slice(0, 10),
			),
		);
	};

  @ViewChild('instance', { static: true }) instance4: NgbTypeahead | undefined;
	focus4$ = new Subject<string>();
	click4$ = new Subject<string>();

	search4: OperatorFunction<string, readonly string[]> = (text4$: Observable<string>) => {
		const debouncedText$ = text4$.pipe(debounceTime(200), distinctUntilChanged());
		const clicksWithClosedPopup$ = this.click4$.pipe(filter(() => this.instance4!.isPopupOpen()));
		const inputFocus$ = this.focus4$;
   

		return merge(debouncedText$, inputFocus$, clicksWithClosedPopup$).pipe(
			map((term) =>
				(term === '' ? this.searchPeople : this.searchPeople.filter((v) => v.toLowerCase().indexOf(term.toLowerCase()) > -1)).slice(0, 10),
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
   

    this.ObjectProductoCode.code = <any>this.ObjectMovimientos.idProducto;
    
    this.ObjectDetalleTraslado.id_nota_traslado=<any>localStorage.getItem("idTraslado");
    this.ObjectDetalleTraslado.estado = 1; //creado

    this.products.searchProductoCode(this.ObjectProductoCode).subscribe(res => {
    this.ObjectProductsViewProducts = res[0];
    this.ObjectDetalleTraslado.id_producto = this.ObjectProductsViewProducts.id;
    this.AgregarDetalleNotaTraslado();
      
    },
      err => {
        console.log(err);
      }

    );

  }

  AgregarDetalleNotaTraslado(){

   
    this.bandera=true;
    this.trasladoService.addDetalleNotaTraslado(this.ObjectDetalleTraslado).subscribe(res => {
      localStorage.setItem("idDetalleTraslado", <any>res);
      this.getDetalleTraslado();
      this.ObjectMovimientos.idProducto = "";
      this.ObjectMovimientos.cantidad = 0;
    },
      err => {
        console.log(err);
      }
  
    );
  
    
  }

  getDetalleTraslado(){
    this.ObjectDetalleTrasladoId.id = <any>localStorage.getItem("idTraslado");
    this.trasladoService.searchDetalleTraslado(this.ObjectDetalleTrasladoId).subscribe(res => {
      this.ListaDetalleTraslado = res;
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


  // DatosTable():void{

  //   const table = document.getElementById("detalle") as HTMLTableElement;
  //  for (let i = 0, row; row = table.rows[i]; i++) {
  //     console.log('dato table ',row);
  //   }
  // }

  setRevisado(){
  for (const i of this.ListaDetalleTraslado!) {
    this.ObjectDetalleTrasladoId.id = i.id;
    this.ObjectDetalleTrasladoId.estado = 0;
    this.trasladoService.updateDetalleTraslado(this.ObjectDetalleTrasladoId).subscribe(res => {
    },
      err => {
        console.log(err);
      }
  
    );
}
    this.setRevisado2()
    this.getDetalleTraslado();
    this.goListaNotaTraslado();
  }
  

  getIdLogin():string{
    const token = localStorage.getItem('token');
    let decodeToken:any = {}
    decodeToken = decode(token || '');
    return decodeToken.id;
  }


  goListaNotaTraslado():void{
    this.router.navigate(['lista-nota-traslado']);
  }


  setRevisado2(){
 
    this.ObjectDetalleTrasladoId.id = <any>localStorage.getItem('idTraslado');
    this.ObjectDetalleTrasladoId.estado = 1;
  
      this.trasladoService.updateTraslado(this.ObjectDetalleTrasladoId).subscribe(res => {
        
      },
        err => {
          console.log(err);
        }
    
      );
     
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