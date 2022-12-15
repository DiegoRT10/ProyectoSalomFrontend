import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-venta-gerente',
  templateUrl: './venta-gerente.component.html',
  styleUrls: ['./venta-gerente.component.css']
})
export class VentaGerenteComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }


  goVentaDiaria():void{
    this.router.navigate(['venta']);
  }
}
