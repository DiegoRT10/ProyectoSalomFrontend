import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MetaFarmacia, VentaDiaria, VentaDiariaService, VentaMes } from '../../services/venta-diaria.service';

@Component({
  selector: 'app-venta',
  templateUrl: './venta.component.html',
  styleUrls: ['./venta.component.css']
})
export class VentaComponent implements OnInit {

  constructor(private router: Router, private VentaDiariaService: VentaDiariaService) { }

  fecha!: Date;
  ListaVenta?: VentaDiaria[];
  ListaMetas?: MetaFarmacia[];
  
  Venta: VentaDiaria = {
    dia:'',
    host:'',
    total:0
  }

  metas: MetaFarmacia ={
    idlocation:'',
    monto:0,
    datenew:this.fecha,
    dateend:this.fecha
  }

  ventaMes: VentaMes ={
    mes: ''
  }

  ngOnInit(): void {
    this.VentaDiaria('cash','202212');
    this.MetaFarmacia();
  }


  setMes(event:any):void{
    this.ventaMes.mes = event.target.value;
    this.ventaMes.mes = this.ventaMes.mes.slice(0,4)+this.ventaMes.mes.slice(5);
    console.log('esta es la fecha seleccionada',this.ventaMes.mes)
    this.VentaDiaria('cash',this.ventaMes.mes);
  }


  VentaDiaria(cash:string,ym:string):void{
    this.Venta.host=cash;
    this.Venta.dia=ym;
    console.log(this.Venta);
    this.VentaDiariaService.getOneVenta(this.Venta).subscribe(res=>{
      this.ListaVenta=<any>res;
      //this.Venta = res[0];
      console.log(res);
    },
    err =>{
      console.log(err);
    }
      
      );
}



MetaFarmacia():void{
  this.VentaDiariaService.getMetas().subscribe(res=>{
    this.ListaMetas=<any>res;
    //this.Venta = res[0];
    console.log(res);
  },
  err =>{
    console.log(err);
  }
    
    );
}


}
