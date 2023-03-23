import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CrudEtapaService, Etapas } from '../../services/crud-etapa.service';

@Component({
  selector: 'app-update-etapa',
  templateUrl: './update-etapa.component.html',
  styleUrls: ['./update-etapa.component.css']
})
export class UpdateEtapaComponent implements OnInit {

  EditEtapa: Etapas ={
    id:'',
    nombre:'',
    descripcion:''
    }
  carga?: boolean;

  constructor(private crudEtapaService:CrudEtapaService, private router:Router, private activatedRoute:ActivatedRoute) { }

  ngOnInit(): void {
    this.carga = true;
    this.getOneEtapa();
  }


  ngAfterViewInit() {
    this.carga = false;
  }

getOneEtapa(): void{
  const idEntrante = localStorage.getItem('idE');
  console.log('idE de entrada: '+idEntrante);
  this.EditEtapa.id=<String>idEntrante;

  if(idEntrante){
    this.crudEtapaService.getOneEtapa(this.EditEtapa).subscribe(res=>{
      this.EditEtapa = res[0];
      console.log(res);
    },
    err =>{
      console.log(err);
    }
      
      );
    }
}

  EditarPuesto():void{
    this.crudEtapaService.editEtapa(this.EditEtapa).subscribe(
      res => {
        console.log('Se edito la Etapa');
        this.router.navigate(['etapa']);
      },
      err => {
        console.log(err);
      });
  }

  
}
