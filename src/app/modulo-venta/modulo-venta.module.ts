import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VentaGerenteComponent } from './components/venta-gerente/venta-gerente.component';
import { VentaAdministradorComponent } from './components/venta-administrador/venta-administrador.component';
import { VentaComponent } from './components/venta/venta.component';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { NgxGaugeModule } from 'ngx-gauge';
import { FarmaciaComponent } from './components/farmacia/farmacia.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import {DragDropModule} from '@angular/cdk/drag-drop';
//import { AccordionComponent } from './accordion/accordion.component';
import { CdkAccordionModule } from '@angular/cdk/accordion';
import { EstimuloGerenteComponent } from './components/estimulo-gerente/estimulo-gerente.component';
import { LoadingComponent } from './components/loading/loading.component';
import { VentaSucursalComponent } from './components/venta-sucursal/venta-sucursal.component';
import { MdbAccordionModule } from 'mdb-angular-ui-kit/accordion';
import { MovimientosAdministradorComponent } from './components/movimientos-administrador/movimientos-administrador.component';
import { NgbTypeaheadModule } from '@ng-bootstrap/ng-bootstrap';
import { NotaTrasladoComponent } from './components/nota-traslado/nota-traslado.component';
import { DetalleNotaTrasladoComponent } from './components/detalle-nota-traslado/detalle-nota-traslado.component';
import { ListaNotaTrasladoComponent } from './components/lista-nota-traslado/lista-nota-traslado.component';
import { ListaSalidasComponent } from './components/lista-salidas/lista-salidas.component';
import { MovimientosInicioComponent } from './components/movimientos-inicio/movimientos-inicio.component';
import { InventarioFarmaciaComponent } from './components/inventario-farmacia/inventario-farmacia.component';



@NgModule({
  declarations: [
    VentaGerenteComponent,
    VentaAdministradorComponent,
    VentaComponent,
    FarmaciaComponent,
    EstimuloGerenteComponent,
    LoadingComponent,
    VentaSucursalComponent,
    MovimientosAdministradorComponent,
    NotaTrasladoComponent,
    DetalleNotaTrasladoComponent,
    ListaNotaTrasladoComponent,
    ListaSalidasComponent,
    MovimientosInicioComponent,
    InventarioFarmaciaComponent,
    //AccordionComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    NgxChartsModule,
    NgxGaugeModule,
    MatSlideToggleModule,
    DragDropModule,
    CdkAccordionModule,
    MdbAccordionModule,
    NgbTypeaheadModule
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class ModuloVentaModule { }


