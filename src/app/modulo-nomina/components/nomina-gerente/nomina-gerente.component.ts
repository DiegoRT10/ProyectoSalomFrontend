import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nomina-gerente',
  templateUrl: './nomina-gerente.component.html',
  styleUrls: ['./nomina-gerente.component.css']
})
export class NominaGerenteComponent implements OnInit {
  carga?: boolean;

  

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.carga = true;
  }

  ngAfterViewInit() {
    this.carga = false;
  }

  Profiles():void{
    this.router.navigate(['profiles']);
  }

  Puesto():void{
    this.router.navigate(['puesto']);
  }

  Etapa():void{
    this.router.navigate(['etapa']);
  }

  Locations():void{
    this.router.navigate(['locations']);
  }
 
  
}