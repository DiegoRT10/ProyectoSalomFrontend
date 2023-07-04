import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-evaluador',
  templateUrl: './home-evaluador.component.html',
  styleUrls: ['./home-evaluador.component.css']
})
export class HomeEvaluadorComponent implements OnInit {
  carga?: boolean;



  constructor(private router: Router) { }

  ngOnInit(): void {
    this.carga = true;
  }

  ngAfterViewInit() {
    this.carga = false;
  }


  goEvaluacion():void{
    this.router.navigate(['evaluacion']);
  }


  goPreguntas():void{
    this.router.navigate(['pregunta-evaluacion']);
  }
 
  
}