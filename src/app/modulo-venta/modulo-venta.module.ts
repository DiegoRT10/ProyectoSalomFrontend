import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VentaGerenteComponent } from './components/venta-gerente/venta-gerente.component';
import { VentaAdministradorComponent } from './components/venta-administrador/venta-administrador.component';



@NgModule({
  declarations: [
    VentaGerenteComponent,
    VentaAdministradorComponent
  ],
  imports: [
    CommonModule
  ]
})
export class ModuloVentaModule { }
