import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-evaluacion-diagnostica',
  templateUrl: './evaluacion-diagnostica.component.html',
  styleUrls: ['./evaluacion-diagnostica.component.css']
})
export class EvaluacionDiagnosticaComponent implements OnInit{

  constructor(private router: Router){

  }


  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  getDatos(){
    
  }

  Start(){
    this.router.navigate(['start-evaluacion-diagnostica']);
  }

}
