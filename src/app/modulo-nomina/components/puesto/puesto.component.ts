import { Component, OnInit } from '@angular/core';
import { CrudPuestoService,Puestos} from './../../services/crud-puesto.service';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-puesto',
  templateUrl: './puesto.component.html',
  styleUrls: ['./puesto.component.css']
})
export class PuestoComponent implements OnInit {

  ListaPuestos?: Puestos[];
  salarioMax:number=0.0;
  salarioMin:number=12500.3542;






  constructor(private crudPuestoService:CrudPuestoService, private router:Router) { }

  ngOnInit(): void {
    this.listarPuestos();
  }

  listarPuestos(){
    this.crudPuestoService.getPuesto().subscribe(
      res=>{
        this.ListaPuestos=<any>res;     
        console.log(this.ListaPuestos);
        

      },
      err =>{
        console.log(err);
      }
    );
  
  }

  crear(): void{
    this.router.navigate(['createPuesto']);
  }
}
