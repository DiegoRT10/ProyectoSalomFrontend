import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbTypeahead, NgbTypeaheadModule } from '@ng-bootstrap/ng-bootstrap';
import { Observable, Subject, merge, OperatorFunction } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, map } from 'rxjs/operators';
import { FormsModule } from '@angular/forms';
import { JsonPipe } from '@angular/common';
import { LocationsId, Products, ProductsService, ViewProducts, ViewProducts2 } from '../../services/products.service';





@Component({
  selector: 'app-movimientos-administrador',
  templateUrl: './movimientos-administrador.component.html',
  // standalone: true,
  // imports: [NgbTypeaheadModule, FormsModule, JsonPipe],
  styleUrls: ['./movimientos-administrador.component.css']
})
export class MovimientosAdministradorComponent implements OnInit{
  product = [''];
  state = [''];
  model: any;
  model2: any;

  ListaProductos?:Products[];
  ListaViewsProducts?:ViewProducts[];
  ListaProductsCodeName?:ViewProducts2[];
  ListaLocationsId?:LocationsId[];

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
  


  


  

  constructor( private products:ProductsService) { }

  ngOnInit(): void {
    // this.getProducts();
    this.getProductsCodeName();
    this.getLocationsId();
  }


	



  setProducto():void{
    
    console.log('Producto seleccionado ', this.model);
  }

  getProducts(): void {
    this.products.getViewsProducts().subscribe(res => {
      this.ObjectViewProducts = <any>res;
      this.ListaViewsProducts = <any>res;
      console.log(this.ListaViewsProducts);
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
        console.log(this.product);  
      }
      
    },
      err => {
        console.log(err);
      }

    );
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

  

  setProucto(event:any):void{
    //let data = event.target.value;
    console.log('Este es el evento de setProduct ',event);
  }

  getLocationsId(): void {
    this.products.getLocationsId().subscribe(res => {
      this.ListaLocationsId = <any>res;

      for (const i of this.ListaLocationsId!) {
        this.state.push( <any>i.id);
        console.log(this.state);  
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

}
