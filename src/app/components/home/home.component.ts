import { Component, OnInit } from '@angular/core';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  carga?: boolean;

  constructor() { 
    
  }

  ngOnInit(): void {
    this.carga = true;
  }
  
  ngAfterViewInit() {
    this.carga = false;
  }
}
