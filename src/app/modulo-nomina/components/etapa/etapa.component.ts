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
  carga?: boolean;

  constructor(private crudEtapaService:CrudEtapaService, private router:Router) { }

  ngOnInit(): void {
    this.carga = true;
    this.listarEtapas();
  }

  ngAfterViewInit() {
    this.carga = false;
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

  crear(): void{
    this.router.navigate(['create-etapa']);
  }

  Editar(id:String):void{
      localStorage.setItem('idE',<string>id);
      this.router.navigate(['update-etapa']); 
  }

  Eliminar(id:any):void{
    console.log('este es el id desde HTML '+id);
    this.DelPuesto.id=id;
    console.log('este es el id desde de la Etapa '+id);
    this.crudEtapaService.delEtapa(id).subscribe(
      res => {
        console.log('Se elimino el puesto');
        this.listarEtapas();
      },
      err => {
        console.log(err);
      });
  }

}
