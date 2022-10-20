import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VacacionesComponent } from './components/vacaciones/vacaciones.component';
import { DespidosComponent } from './components/despidos/despidos.component';
import { ProfileComponent } from './components/profile/profile.component';
import { ProfilesComponent } from './components/profiles/profiles.component';
import { PuestoComponent } from './components/puesto/puesto.component';




@NgModule({
  declarations: [
    VacacionesComponent,
    DespidosComponent,
    ProfileComponent,
    ProfilesComponent,
    PuestoComponent
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
