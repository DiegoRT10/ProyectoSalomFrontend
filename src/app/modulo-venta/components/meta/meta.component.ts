import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MetaFarmacia, DataVentaDiaria, VentaDiariaService, VentaMes, DatosGrafica, DatosVentaGlobal, DatosVentaGlobalMeta } from '../../services/venta-diaria.service';
import { Color, ScaleType } from '@swimlane/ngx-charts';
import * as moment from 'moment';
import 'moment/locale/es';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-meta',
  templateUrl: './meta.component.html',
  styleUrls: ['./meta.component.css']
})
export class MetaComponent {
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
  loading2?:boolean;
  loading3?:boolean;
  loading4?:boolean;
  carga?:boolean;
  prueba: number;

  // view: [number,number] = [1090, 850];
  view: [number,number] = [850, 850];
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = false;
  showXAxisLabel = true;
  xAxisLabel = 'Porcentaje de metas';
  showYAxisLabel = true;
  yAxisLabel = 'Farmacias';
  showlegendPosition = 'left';

  colorScheme: Color = { 
    domain: ['#99CCE5', '#FF7F7F'], 
    group: ScaleType.Ordinal, 
    selectable: true, 
    name: 'Customer Usage', 
};

URL = environment.PORT;

  constructor(private router: Router, private VentaDiariaService: VentaDiariaService) { 
    this.loading2=true;
    this.loading3=true;
    this.loading4=true;
  }

  fecha!: Date;
  ListaVenta?: DataVentaDiaria[];
  ListaMetas?: MetaFarmacia[];
  ListaVentaGlobal?: DatosVentaGlobalMeta[];
  
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
    this.VentaGlobal('cash',this.ventaMes.mes);
    this.ventaMes.mes=this.setFechaEvent();
    this.MetaFarmacia();
    
    // this.setFechaCard();
  }

  ngAfterViewInit() {
    this.carga = false;
  }


  setMes(event:any):void{
    this.loading2=true;
    this.loading3=true;
    this.loading4=true;
    this.ventaMes.mes = event.target.value;
    this.ventaMes.mes = this.ventaMes.mes.slice(0,4)+this.ventaMes.mes.slice(5);
    console.log('Este es el mes de venta',this.ventaMes.mes);
    this.VentaGlobal('cash', this.ventaMes.mes);
    this.ventaMes.mes=this.setFechaEvent();
  }


  
async VentaGlobal(cash: string, ym: string): Promise<void> {
  console.log('entre a venta global');
  try {
      this.Venta.host = cash;
      this.Venta.dia = <any>ym;
      console.log('datos a enviar de Venta Global ',this.Venta.host);
      console.log('datos a enviar de Venta Global ',this.Venta.dia);
      await new Promise<void>((resolve, reject) => {
          this.VentaDiariaService.getVentasGlobalesMeta(this.Venta).subscribe(
              res => {
                  this.ListaVentaGlobal = <any>res;
                  for (const VentaGlobal of this.ListaVentaGlobal) {
                    
                    const nuevoDato: any = {
                      name: VentaGlobal.idlocation.toString(),
                      // value: (VentaGlobal.total / VentaGlobal.monto * 100) 
                      value: VentaGlobal.actual 
                    };
                    this.single.push(nuevoDato);
                  }
                
                  resolve();
                  this.loading2 = false;
                  this.loading3 = false;
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

  //porcentaje venta actual

    const total = this.ListaVentaGlobal.filter(item => item.idlocation === id).map(item => item.total);
    const farmSelect = this.ListaMetas.filter(item => item.idlocation === id);

    
    this.farmacia = farmSelect.map(item => item.idlocation); 
    this.metaActual = farmSelect.map(item => item.monto);
    this.pVenta=(Number(<any>total/this.metaActual)*100).toFixed(2);
    
  
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

obtenerFechaActual() {
  moment.locale('es');
  const fechaActual = moment();
  const diaSemana = fechaActual.format('dddd');
  const dia = fechaActual.format('D');
  const mes = fechaActual.format('MMMM');
  const año = fechaActual.format('YYYY');

  return `${diaSemana} ${dia} de ${mes} de ${año}`;
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



}