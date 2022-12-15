
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-home-sistemas',
  templateUrl: './home-sistemas.component.html',
  styleUrls: ['./home-sistemas.component.css']
})
export class HomeSistemasComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  goModuloNomina():void{
    this.router.navigate(['private']);
  }


}
