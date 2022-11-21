import { Locations } from './../../modulo-nomina/services/crud-profile.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-home-gerente',
  templateUrl: './home-gerente.component.html',
  styleUrls: ['./home-gerente.component.css']
})
export class HomeGerenteComponent implements OnInit {



  constructor(private router: Router) { }

  ngOnInit(): void {
   
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
