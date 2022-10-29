import { Component, OnInit } from '@angular/core';
import { CrudPuestoService,Puestos} from '../../services/crud-puesto.service';
import { Route, Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-update-puesto',
  templateUrl: './update-puesto.component.html',
  styleUrls: ['./update-puesto.component.css']
})
export class UpdatePuestoComponent implements OnInit {


  EditPuesto: Puestos ={
    id:'',
    nombre:'',
    descripcion:'',
    depto:0,
    salarioMin:0.0,
    salarioMax:0.0,
  
    }

  constructor(private crudPuestoService:CrudPuestoService, private router:Router, private activatedRoute:ActivatedRoute) { }

  ngOnInit(): void {
    this.getOnePuesto();
  }


getOnePuesto(): void{
  const idEntrante = localStorage.getItem('idP');
  console.log('idP de entrada: '+idEntrante);
  this.EditPuesto.id=<String>idEntrante;

  if(idEntrante){
    this.crudPuestoService.getOnePuesto(this.EditPuesto).subscribe(res=>{
      this.EditPuesto = res[0];
      console.log(res);
    },
    err =>{
      console.log(err);
    }
      
      );
    }
}

  EditarPuesto():void{
    this.crudPuestoService.editPuesto(this.EditPuesto).subscribe(
      res => {
        console.log('Se edito el puesto');
        this.router.navigate(['puesto']);
      },
      err => {
        console.log(err);
      });
  }

  
}
