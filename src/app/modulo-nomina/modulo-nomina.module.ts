import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VacacionesComponent } from './components/vacaciones/vacaciones.component';
import { DespidosComponent } from './components/despidos/despidos.component';
import { ProfileGerenciaComponent } from './components/profile-gerencia/profile-gerencia.component';
import { ProfileFarmaciaComponent } from './components/profile-farmacia/profile-farmacia.component';
import { ProfileBodegaComponent } from './components/profile-bodega/profile-bodega.component';



@NgModule({
  declarations: [
    VacacionesComponent,
    DespidosComponent,
    ProfileGerenciaComponent,
    ProfileFarmaciaComponent,
    ProfileBodegaComponent
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
