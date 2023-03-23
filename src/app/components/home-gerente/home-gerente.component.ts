import { Locations } from './../../modulo-nomina/services/crud-profile.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-home-gerente',
  templateUrl: './home-gerente.component.html',
  styleUrls: ['./home-gerente.component.css']
})
export class HomeGerenteComponent implements OnInit {
  carga?: boolean;



  constructor(private router: Router) { }

  ngOnInit(): void {
    this.carga = true;
  }

  ngAfterViewInit() {
    this.carga = false;
  }


  goModuloNomina():void{
    this.router.navigate(['nomina-gerente']);
  }

  goModuloVenta():void{
    this.router.navigate(['venta-gerente']);
  }

 
  
}
