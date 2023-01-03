import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-venta-administrador',
  templateUrl: './venta-administrador.component.html',
  styleUrls: ['./venta-administrador.component.css']
})
export class VentaAdministradorComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  goVenta():void{
    this.router.navigate(['venta-sucursal']);
  }

}
