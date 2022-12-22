import { NgModule } from '@angular/core';
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


@NgModule({
  declarations: [
    VentaGerenteComponent,
    VentaAdministradorComponent,
    VentaComponent,
    FarmaciaComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    NgxChartsModule,
    NgxGaugeModule
  ]
})
export class ModuloVentaModule { }


