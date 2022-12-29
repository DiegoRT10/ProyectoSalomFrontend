import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { MetaFarmacia, VentaDiaria, VentaDiariaService, VentaMes, DatosGrafica, PeopleLocation, VentaPorDia, dataVenta, Cierres, dataCierres, Depositos, dataDepositos, Estimulos } from '../../services/venta-diaria.service';
@Component({
  selector: 'app-estimulo-gerente',
  templateUrl: './estimulo-gerente.component.html',
  styleUrls: ['./estimulo-gerente.component.css']
})
export class EstimuloGerenteComponent implements OnInit{


  constructor(private VentaDiariaService: VentaDiariaService){}

  ym:string = "";

  ListaEstimulos?: Estimulos[];
  DataEstimulos: Estimulos ={
    name:"",
    pe:"",
    total:0
  }

  ngOnInit():void{
    this.ym = this.getFecha();
    this.peopleEstimulos();
  }

  peopleEstimulos(): void {

    this.VentaDiariaService.getEstimulos(this.ym).subscribe(res => {
      this.ListaEstimulos = <any>res; 
    },
      err => {
        console.log(err);
      }

    );
  }


  getFecha(): string {
    let date: Date = new Date();
    return moment.utc(date).format('YYYYMM');
  }

}

