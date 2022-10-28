import { Component, OnInit } from '@angular/core';
import { CrudPuestoService,Puestos} from '../../services/crud-puesto.service';
import { Route, Router } from '@angular/router';


@Component({
  selector: 'app-create',
  templateUrl: './createPuesto.component.html',
  styleUrls: ['./createPuesto.component.css']
})
export class CreatePuestoComponent implements OnInit {

  AggPuesto: Puestos ={
  id:'',
  nombre:'',
  descripcion:'',
  depto:0,
  salarioMin:0.0,
  salarioMax:0.0,

  }

  constructor(private crudPuestoService:CrudPuestoService, private router:Router) { }

  ngOnInit(): void {
  }

  AgregarPuesto():void{
    this.crudPuestoService.addPuesto(this.AggPuesto).subscribe(
      res => {
        console.log('Se agrego el puesto');
        this.router.navigate(['private']);
      },
      err => {
        console.log(err);
      });

  }
 
}
