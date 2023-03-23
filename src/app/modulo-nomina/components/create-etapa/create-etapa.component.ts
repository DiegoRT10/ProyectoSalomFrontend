import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CrudEtapaService, Etapas } from '../../services/crud-etapa.service';

@Component({
  selector: 'app-create-etapa',
  templateUrl: './create-etapa.component.html',
  styleUrls: ['./create-etapa.component.css']
})
export class CreateEtapaComponent implements OnInit {

  
  AggEtapa: Etapas ={
    id:'',
    nombre:'',
    descripcion:''

    }
  carga?: boolean;
  
    constructor(private crudEtapaService:CrudEtapaService, private router:Router) { }
  
    ngOnInit(): void {
      this.carga = true;
    }
  
    ngAfterViewInit() {
      this.carga = false;
    }
  


    AgregarEtapa():void{
      this.crudEtapaService.addEtapa(this.AggEtapa).subscribe(
        res => {
          console.log('Se agrego la etapa');
          this.router.navigate(['etapa']);
        },
        err => {
          console.log(err);
        });
    }
   
  }
  