import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-administrador',
  templateUrl: './home-administrador.component.html',
  styleUrls: ['./home-administrador.component.css']
})
export class HomeAdministradorComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }


  goModuloNomina():void{
    this.router.navigate(['nomina-administrador']);
  }

  goModuloVenta():void{
    this.router.navigate(['venta-administrador']);
  }

}
