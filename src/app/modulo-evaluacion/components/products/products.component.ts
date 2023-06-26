import { Component, OnInit } from '@angular/core';
import { ExchangeService, ID } from '../../services/exchange.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit{

    ID:ID={
      id: 0
    }

   constructor(private exchangeService: ExchangeService ){

   }

  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }


  sendDatos(){
    this.ID.id = 1 
    this.exchangeService.getProducto().subscribe(
        res=>{
    
        },
        err =>{
          console.log(err);
        }
      );
    
    }
  

}
