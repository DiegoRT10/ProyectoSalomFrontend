import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, debounceTime, distinctUntilChanged, map } from 'rxjs';
import { ProductsService, productsViewProducts } from 'src/app/modulo-venta/services/products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent {
  
  constructor( private productService:ProductsService, private router: Router) { }

  private ListaProductos!: productsViewProducts[];

  searchTerm$ = new BehaviorSubject<string>('');

  private list = [''];
  listFiltered$: Observable<string[]> | undefined;

  ngOnInit(): void {
    this.filterList();
  }

  filterList(): void {
    this.productService.getProductosView().subscribe(res => {
      this.ListaProductos = <any>res;
      for (const i of this.ListaProductos) {
        this.list.push(i.code+" "+i.nombre);   
      }
     
      return this.ListaProductos;
    },
      err => {
        console.log(err);
      }

    );

    console.log('este es el event ',this.searchTerm$);
    this.listFiltered$ = this.searchTerm$
      .pipe(
        debounceTime(400),
        distinctUntilChanged(),
        map(term => {
            return this.list
              .filter(item => item.toLowerCase().indexOf(term.toLowerCase()) >= 0);
        })
      );
  }










}
