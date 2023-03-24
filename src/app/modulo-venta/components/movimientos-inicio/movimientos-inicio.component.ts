import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-movimientos-inicio',
  templateUrl: './movimientos-inicio.component.html',
  styleUrls: ['./movimientos-inicio.component.css']
})
export class MovimientosInicioComponent {
  carga?: boolean;

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.carga = true;
  }

  ngAfterViewInit() {
    this.carga = false;
  }

  goCrearNota():void{
    this.router.navigate(['nota-traslado']);
  }

  goListarMovimientos():void{
    this.router.navigate(['lista-nota-traslado']);
  }


}
