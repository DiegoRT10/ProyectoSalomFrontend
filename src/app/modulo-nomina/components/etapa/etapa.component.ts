import { Component, OnInit } from '@angular/core';
import { CrudEtapaService,Etapas} from './../../services/crud-etapa.service';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-etapa',
  templateUrl: './etapa.component.html',
  styleUrls: ['./etapa.component.css']
})
export class EtapaComponent implements OnInit {

  ListaEtapas?: Etapas[];

  DelPuesto: Etapas ={
    id:'',
    nombre:'',
    descripcion:''
  
    }

  constructor(private crudEtapaService:CrudEtapaService, private router:Router) { }

  ngOnInit(): void {
    this.listarEtapas();
  }

  listarEtapas(){
    this.crudEtapaService.getEtapa().subscribe(
      res=>{
        this.ListaEtapas=<any>res;     
        console.log(this.ListaEtapas);
        

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
    this.crudEtapaService.delEtapa(id).subscribe(
      res => {
        console.log('Se elimino el puesto');
        this.router.navigate(['puesto']);
      },
      err => {
        console.log(err);
      });
  }

}
