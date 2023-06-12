import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  carga?: boolean;

  constructor(private router: Router) { 
    
  }

  ngOnInit(): void {
    this.carga = true;
  }
  
  ngAfterViewInit() {
    this.carga = false;
  }

  goProducts():void{
    this.router.navigate(['products']);
  }

  goMantenimiento():void{
    this.router.navigate(['mantenimiento']);
  }

}
