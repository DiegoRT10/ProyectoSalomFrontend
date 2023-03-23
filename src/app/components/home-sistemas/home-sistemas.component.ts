
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-home-sistemas',
  templateUrl: './home-sistemas.component.html',
  styleUrls: ['./home-sistemas.component.css']
})
export class HomeSistemasComponent implements OnInit {
  carga?: boolean;

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.carga = true;
  }

  ngAfterViewInit() {
    this.carga = false;
  }

  goModuloNomina():void{
    this.router.navigate(['private']);
  }


}
