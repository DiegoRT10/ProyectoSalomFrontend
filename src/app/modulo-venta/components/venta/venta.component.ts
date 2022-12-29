import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MetaFarmacia, VentaDiaria, VentaDiariaService, VentaMes, DatosGrafica } from '../../services/venta-diaria.service';
import { Color, ScaleType } from '@swimlane/ngx-charts';
import * as moment from 'moment';


@Component({
  selector: 'app-venta',
  templateUrl: './venta.component.html',
  styleUrls: ['./venta.component.css']
})
export class VentaComponent implements OnInit {
  farmacia?: any;
  pVenta: any = 0;
  pVentaDiaria: any = 0;
  pProyeccion:any = 0;
  ventaActual: any = 0;
  metaActual: any = 0;
  noDiasMes: any = 0;
  fechaResumen: any;
  totalVentaActual: number = 0;
  totalVentaMeta: number = 0;
  single?: DatosGrafica[];
  date: Date = new Date();
  diaRestantes:number = this.date.getDate();
  check:string='';
  dia=new Date().getDate();
  // options
  // gradient: boolean = true;
  // showLegend: boolean = true;
  // showLabels: boolean = true;
  // isDoughnut: boolean = false;
  // options
  view: [number,number] = [1090, 850];
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = false;
  showXAxisLabel = true;
  xAxisLabel = 'Farmacias';
  showYAxisLabel = true;
  yAxisLabel = 'Ventas Actuales';
  showlegendPosition = 'left';

  colorScheme: Color = { 
    domain: ['#99CCE5', '#FF7F7F'], 
    group: ScaleType.Ordinal, 
    selectable: true, 
    name: 'Customer Usage', 
};

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
    this.VentaDiaria('cash',this.setFecha());
    this.MetaFarmacia();
    this.setFechaCard();
    console.log('este es el dia actual ',this.dia);
    
   
  }


  setMes(event:any):void{
    this.ventaMes.mes = event.target.value;
    console.log(this.ventaMes.mes);
    this.ventaMes.mes = this.ventaMes.mes.slice(0,4)+this.ventaMes.mes.slice(5);
    this.VentaDiaria('cash',this.ventaMes.mes);
  }


  VentaDiaria(cash:string,ym:string):void{

    this.Venta.host=cash;
    this.Venta.dia=<any>ym;
    this.VentaDiariaService.getOneVenta(this.Venta).subscribe(res=>{
      this.ListaVenta=<any>res;
      
      //this.Venta = res[0];
      
    },
    err =>{
      console.log(err);
    }
      
      );

      this.VentaDiariaService.getDatos(this.Venta).subscribe(res=>{
        this.single=<any>res;
        //this.Venta = res[0];
        
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
    this.DatosCard();
  },
  err =>{
    console.log(err);
  }
    
    );
}


OneMetaFarmacia(id:string, val:any ):void{
  //this.metas.idlocation = id;
  // this.VentaDiariaService.getOneMeta(this.metas).subscribe(res=>{
  //   //this.ListaMetas=<any>res;
  //   this.metas = res[0];
  //   this.metaActual=this.metas.monto;
  //   console.log('monto desde one farmacia', this.metaActual);
  //   console.log('datos desde one meta',res);
  //   console.log('dato monto de one select', this.metaActual);
  //   this.farmacia=id
  //   this.ventaActual=val;
  //   this.pVenta=(val/this.metaActual)*100;
    
  //   console.log('Porcentaje de venta',this.pVenta);
  // },
  // err =>{
  //   console.log(err);
  // }
    
  //   );

  

  //porcentaje venta actual
  for(let i of this.ListaMetas!){
    if(id == i.idlocation){
    this.farmacia=i.idlocation
    this.metaActual = i.monto;
    this.pVenta=((val/i.monto)*100).toFixed(2);
    }
  }

  //Porcentaje venta diaria y porcentaja de proyeccion
  for(let i of this.ListaVenta!){
   if(id == i.host){
    this.pVentaDiaria=((i.dia/this.noDiasMes)*100).toFixed(2);
    this.pProyeccion=((((i.total/i.dia)*this.noDiasMes)/this.metaActual)*100).toFixed(2);
   }
  }

  
}

setFechaCard():void{
  let date: Date = new Date();
  this.fechaResumen = moment.utc(date).format('DD/MM/YYYY');
  this.noDiasMes = this.diasEnUnMes(date.getMonth()+1,date.getFullYear());//se le suma +1 al mes porque para typescript enero = 0
}


DatosCard():void{
  for(let i of this.ListaMetas!){
  for(let j of this.ListaVenta!){
    if(i.idlocation == j.host){
      this.totalVentaActual += j.total;
      this.totalVentaMeta += i.monto;
    }
   }
   }

}

 diasEnUnMes(mes:number, año:number) {
	return new Date(año, mes, 0).getDate();
}


 

setFecha(): string {
  let date: Date = new Date();
  return moment.utc(date).format('YYYYMM');
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
