import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-venta-administrador',
  templateUrl: './venta-administrador.component.html',
  styleUrls: ['./venta-administrador.component.css']
})
export class VentaAdministradorComponent implements OnInit {
  carga?: boolean;

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.carga = true;
  }

  ngAfterViewInit() {
    this.carga = false;
  }

  goVenta():void{
    this.router.navigate(['venta-sucursal']);
  }

  goMovimientos():void{
    this.router.navigate(['movimientos-inicio']);
  }

  goInventario():void{
    this.router.navigate(['inventario-farmacia']);
  }
}


