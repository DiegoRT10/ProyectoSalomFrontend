import { Component, OnInit } from '@angular/core';
import { CrudPuestoService,Puestos} from '../../services/crud-puesto.service';
import { Route, Router } from '@angular/router';


@Component({
  selector: 'app-create',
  templateUrl: './create-puesto.component.html',
  styleUrls: ['./create-puesto.component.css']
})
export class CreatePuestoComponent implements OnInit {

  AggPuesto: Puestos ={
  id:'',
  nombre:'',
  descripcion:'',
  depto:0,
  salario_min:0.0,
  salario_max:0.0,

  }

  constructor(private crudPuestoService:CrudPuestoService, private router:Router) { }

  ngOnInit(): void {
    const deptoEntrante = localStorage.getItem('dep');
    this.AggPuesto.depto=<any>deptoEntrante;
  }

  AgregarPuesto():void{
    this.crudPuestoService.addPuesto(this.AggPuesto).subscribe(
      res => {
        console.log('Se agrego el puesto');
        this.router.navigate(['puesto']);
      },
      err => {
        console.log(err);
      });
  }
 
}
