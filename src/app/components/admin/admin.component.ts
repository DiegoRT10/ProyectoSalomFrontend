import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  bandera:boolean=false;

  constructor() { }

  ngOnInit(): void {
  }

  Activar():void{
    this.bandera=true;
  }
}
