import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VentaGerenteComponent } from './components/venta-gerente/venta-gerente.component';
import { VentaAdministradorComponent } from './components/venta-administrador/venta-administrador.component';
import { VentaComponent } from './components/venta/venta.component';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    VentaGerenteComponent,
    VentaAdministradorComponent,
    VentaComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule
  ]
})
export class ModuloVentaModule { }
