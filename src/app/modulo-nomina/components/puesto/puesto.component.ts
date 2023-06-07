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
    salario_min:0.0,
    salario_max:0.0,
  
    }
  carga?: boolean;




  constructor(private crudPuestoService:CrudPuestoService, private router:Router) { }

  ngOnInit(): void {
    this.carga = true;
    this.listarPuestos();
  }

  ngAfterViewInit() {
    this.carga = false;
  }


  listarPuestos(){
    this.crudPuestoService.getPuesto().subscribe(
      res=>{
        this.ListaPuestos=<any>res;     
        
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
    this.DelPuesto.id=id;
    this.crudPuestoService.delPuesto(id).subscribe(
      res => {
        this.listarPuestos();
      },
      err => {
        console.log(err);
      });
  }
}
