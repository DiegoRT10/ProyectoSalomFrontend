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

  DelPuesto: Puestos ={
    id:'',
    nombre:'',
    descripcion:'',
    depto:0,
    salarioMin:0.0,
    salarioMax:0.0,
  
    }




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

  crear(dep:String): void{
    localStorage.setItem('dep',<string>dep);
    this.router.navigate(['create-puesto']);
  }

  Editar(id:String):void{
      localStorage.setItem('idP',<string>id);
      this.router.navigate(['update-puesto']); 
  }

  Eliminar(id:any):void{
    console.log('este es el id desde HTML '+id);
    this.DelPuesto.id=id;
    console.log('este es el id desde delPuesto '+id);
    this.crudPuestoService.delPuesto(id).subscribe(
      res => {
        console.log('Se elimino el puesto');
        this.listarPuestos();
      },
      err => {
        console.log(err);
      });
  }
}
