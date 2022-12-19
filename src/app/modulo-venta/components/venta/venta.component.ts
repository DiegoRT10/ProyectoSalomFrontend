import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MetaFarmacia, VentaDiaria, VentaDiariaService, VentaMes, DatosGrafica } from '../../services/venta-diaria.service';
import { Color, ScaleType } from '@swimlane/ngx-charts';


@Component({
  selector: 'app-venta',
  templateUrl: './venta.component.html',
  styleUrls: ['./venta.component.css']
})
export class VentaComponent implements OnInit {
  farmacia?: any;
  pVenta: any = 0;
  ventaActual: any = 0;
  metaActual: any = 0;
  single?: DatosGrafica[];
  view: [number,number] = [1090, 400];


  // options
  // gradient: boolean = true;
  // showLegend: boolean = true;
  // showLabels: boolean = true;
  // isDoughnut: boolean = false;
  // options
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = false;
  showXAxisLabel = true;
  xAxisLabel = 'Farmacias';
  showYAxisLabel = true;
  yAxisLabel = 'Ventas Actuales';
  showlegendPosition = 'left';

  // colorScheme = {
  //   domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  // };

  colorScheme: Color = { 
    domain: ['#99CCE5', '#FF7F7F'], 
    group: ScaleType.Ordinal, 
    selectable: true, 
    name: 'Customer Usage', 
};

//  single = [
//     {
//       "name": "Germany",
//       "value": 8940000
//     },
//     {
//       "name": "USA",
//       "value": 5000000
//     },
//     {
//       "name": "France",
//       "value": 7200000
//     },
//       {
//       "name": "UK",
//       "value": 6200000
//     }
//   ];

  constructor(private router: Router, private VentaDiariaService: VentaDiariaService) { }

  fecha!: Date;
  ListaVenta?: VentaDiaria[];
  ListaMetas?: MetaFarmacia[];
  
  Venta: VentaDiaria = {
    dia:0,
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

  // single: DatosGrafica ={
  //   name:'',
  //   value:0
  // }; 

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
    this.Venta.dia=<any>ym;
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

      this.VentaDiariaService.getDatos(this.Venta).subscribe(res=>{
        this.single=<any>res;
        //this.Venta = res[0];
        console.log('Datos consulta para la garfica',res);
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


OneMetaFarmacia(id:string, val:any ):void{
  this.metas.idlocation = id;
  this.VentaDiariaService.getOneMeta(this.metas).subscribe(res=>{
    //this.ListaMetas=<any>res;
    this.metas = res[0];
    this.metaActual=this.metas.monto;
    console.log('monto desde one farmacia', this.metaActual);
    console.log('datos desde one meta',res);
    console.log('dato monto de one select', this.metaActual);
    this.farmacia=id
    this.ventaActual=val;
    this.pVenta=(val/this.metaActual)*100;
    console.log('Porcentaje de venta',this.pVenta);
  },
  err =>{
    console.log(err);
  }
    
    );
}


goFarmacia(id:String):void{
  localStorage.setItem('idFar',<string>id);
  this.router.navigate(['farmacia']);
}


onSelect(data:any): void {
  console.log('Item clicked', JSON.parse(JSON.stringify(data)));
  this.OneMetaFarmacia(data.name,data.value);
 
}

onActivate(data:any): void {
  console.log('Activate', JSON.parse(JSON.stringify(data)));
}

onDeactivate(data:any): void {
  console.log('Deactivate', JSON.parse(JSON.stringify(data)));
}



}
