import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MetaFarmacia, DataVentaDiaria, VentaDiariaService, VentaMes, DatosGrafica, DatosVentaGlobal, DatosVentaGlobalMeta, PeopleLocation, diasMetas, fechaMetas } from '../../services/venta-diaria.service';
import { Color, ScaleType } from '@swimlane/ngx-charts';
import * as moment from 'moment';
import 'moment/locale/es';
import { environment } from 'src/environments/environment';
import { AppComponent } from 'src/app/app.component';
import { PeopleLocationMeta, PeopleLocationService, PeopleRank, customColors } from '../../services/people-location.service';


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
  customColors: customColors[] = [];
  fechaMeta:string;



  // customColors: any;
  date: Date = new Date();
  diaRestantes:number = this.date.getDate();
  check:string='';
  dia=new Date().getDate();
  loading2?:boolean;
  loading3?:boolean;
  loading4?:boolean;
  carga?:boolean;
  prueba: number;
  fisrtp:string;
  secondp:string;
  unionId:string;
  unionName:string;

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
  xScaleMax = 100;




  colorScheme: Color = { 
    domain: ['#00ff2a'], 
    group: ScaleType.Ordinal, 
    selectable: true, 
    name: 'Customer Usage', 
};




URL = environment.PORT;

  constructor(private router: Router, private VentaDiariaService: VentaDiariaService, private peopleLocationService: PeopleLocationService) { 
    this.loading2=true;
    this.loading3=true;
    this.loading4=true;
  }

  fecha!: Date;
  ListaVenta?: DataVentaDiaria[];
  ListaMetas?: MetaFarmacia[];
  ListaVentaGlobal?: DatosVentaGlobalMeta[];
  ListPeopleLocation?: PeopleLocationMeta[];
  ListPeopleLocationRank: PeopleRank[] = [];
  

  fechaMetasFarmacias:fechaMetas = {
    pay: '',
    fecha: ''
  }

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

  diaMetas: diasMetas = {
    dia: ''
  }


  ngOnInit(): void {
    this.obtenerFechaActual();
    this.setFechaCard()
    this.PeopleLocations();
    AppComponent.viewBar = false;
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
    this.VentaGlobal('cash', this.ventaMes.mes);
    this.ventaMes.mes=this.setFechaEvent();
  }


  
async VentaGlobal(cash: string, ym: string): Promise<void> {
  let rank = 1;
  try {
      this.fechaMetasFarmacias.pay = cash;
      this.fechaMetasFarmacias.fecha = ym;

      await new Promise<void>((resolve, reject) => {
          this.VentaDiariaService.getVentasGlobalesMeta(this.fechaMetasFarmacias).subscribe(
              res => {
                  this.ListaVentaGlobal = <any>res;

                  for (const VentaGlobal of this.ListaVentaGlobal) {
                  
                    const nuevoDato: any = {
                      name: VentaGlobal.idlocation.toString(),
                      value: VentaGlobal.actual 
                    };
                    this.single.push(nuevoDato);

                    let metaSugerida = (VentaGlobal.dia * 100 /this.noDiasMes);
                    
                    // this.xScaleMax = metaSugerida + 10;
                    
                    if(VentaGlobal.actual < metaSugerida){
                      
                      const nuevoDato: any = {
                        name: VentaGlobal.idlocation.toString(),
                        value: '#ff0000'
                      };
                      this.customColors.push(nuevoDato);
                    }
                    else{
                     
                      const nuevoDato: any = {
                        name: VentaGlobal.idlocation.toString(),
                        value: '#00ff2a'
                      };
                      this.customColors.push(nuevoDato);
                    }

                   

                    const persona = this.ListPeopleLocation.filter(item => item.idlocation == VentaGlobal.idlocation).map(item => item);

                    
                   
                    if(persona.length === 2){
                    this.fisrtp = persona.slice(0,1).map(item => item.id).toString();
                    this.secondp = persona.slice(1,2).map(item => item.id).toString();
                    this.unionId = `${this.fisrtp}-${this.secondp}`;
                    this.fisrtp = persona.slice(0,1).map(item => item.name).toString();
                    this.secondp = persona.slice(1,2).map(item => item.name).toString();
                    this.unionName = `${this.fisrtp} y ${this.secondp}`;



                    
                    const nuevoDato: any = {
                      id: this.unionId,
                      name: this.unionName,
                      idlocation: persona.slice(1,2).map(item => item.idlocation).toString(),
                      puesto: rank++,
                      meta: metaSugerida,
                      actual: VentaGlobal.actual,
                    };

                  

                    this.ListPeopleLocationRank.push(nuevoDato);

                    }else{
                      const nuevoDato: any = {
                        id: persona.map(item => item.id).toString(),
                        name: persona.map(item => item.name).toString(),
                        idlocation: persona.map(item => item.idlocation).toString(),
                        puesto: rank++,
                        meta: metaSugerida,
                        actual: VentaGlobal.actual,
                      };
                      this.ListPeopleLocationRank.push(nuevoDato);

                    }

                    

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

async PeopleLocations(): Promise<void> {
  try {
      await new Promise<void>((resolve, reject) => {
          this.peopleLocationService.getPeopleLocation().subscribe(
              res => {
                  this.ListPeopleLocation = <any>res;
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
  return moment.utc(date).format('YYYY/MM/DD');
}

setFechaEvent(): string {
  let date: Date = new Date();
  return moment.utc(date).format('YYYY-MM');
}

obtenerFechaActual(){
  let fechaMoment;
  let diaSemana;
  let dia;
  let mes;
  let año;

  this.VentaDiariaService.getDiaMeta().subscribe(res => {
            this.diaMetas = res[0]
            moment.locale('es');
            fechaMoment = moment(this.diaMetas.dia, 'YYYY/MM/DD');

            // Verificar si la fecha es válida
            if (!fechaMoment.isValid()) {
              console.log('Fecha inválida');
            }

            // Formatear la fecha según tus requerimientos
          diaSemana = fechaMoment.format('dddd');

          
          dia = fechaMoment.format('D');
          mes = fechaMoment.format('MMMM');
          año = fechaMoment.format('YYYY');
          this.fechaMeta = `${diaSemana} ${dia} de ${mes} de ${año}`;
     
  },
    err => {
      console.log(err);
    }

  );
// Devolver la fecha formateada


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