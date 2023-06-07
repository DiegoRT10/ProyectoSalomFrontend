import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { MetaFarmacia, DataVentaDiaria, VentaDiariaService, VentaMes, DatosGrafica, PeopleLocation, VentaPorDia, dataVenta, Cierres, dataCierres, Depositos, dataDepositos, Estimulos, YM } from '../../services/venta-diaria.service';
@Component({
  selector: 'app-estimulo-gerente',
  templateUrl: './estimulo-gerente.component.html',
  styleUrls: ['./estimulo-gerente.component.css']
})
export class EstimuloGerenteComponent implements OnInit{

  loading?:boolean;
  carga?: boolean;

  constructor(private VentaDiariaService: VentaDiariaService){
    this.loading=true;
  }


  ListaEstimulos?: Estimulos[];
  DataEstimulos: Estimulos ={
    name:"",
    pe:"",
    total:0
  }

ym: YM ={
  ym:''
}

  ngOnInit():void{
    this.carga = true;
    this.peopleEstimulos();
  }

  ngAfterViewInit() {
    this.carga = false;
  }

  peopleEstimulos(): void {
    this.ym.ym = this.getFecha();
    this.VentaDiariaService.getEstimulos(this.ym).subscribe(res => {
      this.ListaEstimulos = <any>res; 
      this.loading=false;
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

