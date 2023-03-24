import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-venta-gerente',
  templateUrl: './venta-gerente.component.html',
  styleUrls: ['./venta-gerente.component.css']
})
export class VentaGerenteComponent implements OnInit {
  carga?: boolean;

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.carga = true;
  }

  ngAfterViewInit() {
    this.carga = false;
  }

  goVentaDiaria():void{
    this.router.navigate(['venta']);
  }

  goEstimulo():void{
    this.router.navigate(['estimulo-gerente']);
  }

  goMovimientos():void{
    this.router.navigate(['lista-salidas']);
  }
}
