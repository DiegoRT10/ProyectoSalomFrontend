import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VacacionesComponent } from './components/vacaciones/vacaciones.component';
import { DespidosComponent } from './components/despidos/despidos.component';



@NgModule({
  declarations: [
    VacacionesComponent,
    DespidosComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    VacacionesComponent,
    DespidosComponent
  ]
})
export class ModuloNominaModule { }
