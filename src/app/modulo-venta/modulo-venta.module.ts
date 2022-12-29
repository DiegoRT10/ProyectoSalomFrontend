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



@NgModule({
  declarations: [
    VentaGerenteComponent,
    VentaAdministradorComponent,
    VentaComponent,
    FarmaciaComponent,
    EstimuloGerenteComponent
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
    CdkAccordionModule
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class ModuloVentaModule { }


