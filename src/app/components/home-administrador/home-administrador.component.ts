import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-administrador',
  templateUrl: './home-administrador.component.html',
  styleUrls: ['./home-administrador.component.css']
})
export class HomeAdministradorComponent implements OnInit {
  carga!: boolean;

  constructor(private router: Router) { }

  

  ngOnInit(): void {
    this.carga = true;
  }

  ngAfterViewInit() {
    this.carga = false;
  }

  goModuloNomina():void{
    this.router.navigate(['about-me']);
  }

  goModuloVenta():void{
    this.router.navigate(['venta-administrador']);
  }

}
