import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MetaFarmacia, DataVentaDiaria, VentaDiariaService, VentaMes, DatosGrafica, DatosVentaGlobal } from '../../services/venta-diaria.service';
import { Color, ScaleType } from '@swimlane/ngx-charts';
import * as moment from 'moment';
import { of } from 'rxjs';


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
  single: DatosGrafica[] = [];
  date: Date = new Date();
  diaRestantes:number = this.date.getDate();
  check:string='';
  dia=new Date().getDate();
  loading1?:boolean;
  loading2?:boolean;
  loading3?:boolean;
  loading4?:boolean;
  carga?:boolean;
  proyecccion:number=0;
  meta:number=0;


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



  constructor(private router: Router, private VentaDiariaService: VentaDiariaService) { 
    this.loading1=true;
    this.loading2=true;
    this.loading3=true;
    this.loading4=true;
  }

  fecha!: Date;
  ListaVenta?: DataVentaDiaria[];
  ListaMetas?: MetaFarmacia[];
  ListaVentaGlobal?: DatosVentaGlobal[];
  
  Venta: DataVentaDiaria = {
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



  ngOnInit(): void {
    this.carga = true;
    this.ventaMes.mes = this.setFecha();
    this.VentaDiaria('cash',this.ventaMes.mes);
    this.VentaGlobal('cash',this.ventaMes.mes);
    this.ventaMes.mes=this.setFechaEvent();
    this.MetaFarmacia();
    
    this.setFechaCard();
    
  }

  ngAfterViewInit() {
    this.carga = false;
  }


  setMes(event:any):void{
    this.ventaMes.mes = event.target.value;
    this.ventaMes.mes = this.ventaMes.mes.slice(0,4)+this.ventaMes.mes.slice(5);
    this.VentaDiaria('cash',this.ventaMes.mes);
    this.VentaGlobal('cash', this.ventaMes.mes);
    this.ventaMes.mes=this.setFechaEvent();
  }


  async VentaDiaria(cash: string, ym: string): Promise<void> {
    try {
        this.Venta.host = cash;
        this.Venta.dia = <any>ym;

        await new Promise<void> ((resolve, reject) => {
            this.VentaDiariaService.getOneVenta(this.Venta).subscribe(
                res => {
                    this.ListaVenta = <any>res;
                    this.DatosCard();
                    resolve();
                    this.loading1 = false;
                },
                err => {
                    console.log(err);
                    reject(err);
                }
            );
        });

    } catch (error) {
        console.log(error);
    }
}



async VentaGlobal(cash: string, ym: string): Promise<void> {
  try {
      this.Venta.host = cash;
      this.Venta.dia = <any>ym;
      await new Promise<void>((resolve, reject) => {
          this.VentaDiariaService.getVentasGlobales(this.Venta).subscribe(
              res => {
                  this.ListaVentaGlobal = <any>res;
                  for (const VentaGlobal of this.ListaVentaGlobal) {
                    const nuevoDato: any = {
                      name: VentaGlobal.idlocation.toString(),
                      value: VentaGlobal.total
                    };
                    this.single.push(nuevoDato);
                  }
                  
                  resolve();
                  this.loading2 = false;
                  this.loading3 = false;
                  this.dataResumen();
              },
              err => {
                  console.log(err);
                  reject(err);
              }
          );
      });
  } catch (error) {
      console.log(error);
  }
}



async MetaFarmacia(): Promise<void> {
  try {
      await new Promise<void>((resolve, reject) => {
          this.VentaDiariaService.getMetas().subscribe(
              res => {
                  this.ListaMetas = <any>res;
                  resolve();
              },
              err => {
                  console.log(err);
                  reject(err);
              }
          );
      });
  } catch (error) {
      console.log(error);
  }
}



OneMetaFarmacia(id:string, val:any ):void{

  const metas = this.ListaMetas.filter(item => item.idlocation == id);
  this.farmacia = metas.map(item => item.idlocation);
  this.metaActual = metas.map(item => item.monto);
  this.pVenta = ((val/this.metaActual)*100).toFixed(2);



  //porcentaje venta actual
  // for(let i of this.ListaMetas!){
  //   if(id == i.idlocation){
  //   this.farmacia=i.idlocation
  //   this.metaActual = i.monto;
  //   this.pVenta=((val/i.monto)*100).toFixed(2);
  //   console.log('datos del for this.farmacia = ',this.farmacia, ' this.metaActual = ', this.metaActual,' this.pVenta = ',this.pVenta);
  //   }
  // }

  


  //Porcentaje venta diaria y porcentaja de proyeccion

  const ventas = this.ListaVenta.filter(item => item.host == id);
  this.pVentaDiaria = ((Number(ventas.map(item => item.dia))/this.noDiasMes)*100).toFixed(2);
  this.pProyeccion = ((((Number(ventas.map(item => item.total))/Number(ventas.map(item => item.dia)))*this.noDiasMes)/this.metaActual)*100).toFixed(2);
  console.log('desde el filter this.pVentaDiaria ',this.pVentaDiaria);
  console.log('desde el filter this.pProyeccion ',this.pProyeccion);


  // for(let i of this.ListaVenta!){
  //  if(id == i.host){
  //   this.pVentaDiaria=((i.dia/this.noDiasMes)*100).toFixed(2);
  //   this.pProyeccion=((((i.total/i.dia)*this.noDiasMes)/this.metaActual)*100).toFixed(2);
  //   console.log('desde el for this.pVentaDiaria ',this.pVentaDiaria);
  // console.log('desde el for this.pProyeccion ',this.pProyeccion);
  //  }
  // }

  
}

setFechaCard():void{
  let date: Date = new Date();
  this.fechaResumen = moment.utc(date).format('DD/MM/YYYY');
  this.noDiasMes = this.diasEnUnMes(date.getMonth()+1,date.getFullYear());//se le suma +1 al mes porque para typescript enero = 0
}


DatosCard():void{
 
  for(let i of this.ListaMetas!){
    this.totalVentaMeta += i.monto;
     }

     for(let j of this.ListaVenta!){
        this.totalVentaActual += j.total;
     }
}

 diasEnUnMes(mes:number, año:number) {
	return new Date(año, mes, 0).getDate();
}


 

setFecha(): string {
  let date: Date = new Date();
  return moment.utc(date).format('YYYYMM');
}

setFechaEvent(): string {
  let date: Date = new Date();
  return moment.utc(date).format('YYYY-MM');
}


goFarmacia(id:String):void{
  localStorage.setItem('idFar',<string>id);
  this.router.navigate(['farmacia']);
}


onSelect(data:any): void {
  // console.log('Item clicked', JSON.parse(JSON.stringify(data)));
  this.OneMetaFarmacia(data.name,data.value);
 
}

onActivate(data:any): void {
  // console.log('Activate', JSON.parse(JSON.stringify(data)));
}

onDeactivate(data:any): void {
  // console.log('Deactivate', JSON.parse(JSON.stringify(data)));
}

dataResumen(){
  for (const venta of this.ListaVentaGlobal) {
    this.proyecccion+=(venta.total/venta.dia)*(this.noDiasMes);
    this.meta += venta.monto;
  }

}


}
