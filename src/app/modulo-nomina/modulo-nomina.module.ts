import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VacacionesComponent } from './components/vacaciones/vacaciones.component';
import { DespidosComponent } from './components/despidos/despidos.component';
import { ProfileComponent } from './components/profile/profile.component';
import { ProfilesComponent } from './components/profiles/profiles.component';
import { PuestoComponent } from './components/puesto/puesto.component';
import { CreatePuestoComponent } from './components/create-puesto/create-puesto.component';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { UpdatePuestoComponent } from './components/update-puesto/update-puesto.component';


@NgModule({
  declarations: [
    VacacionesComponent,
    DespidosComponent,
    ProfileComponent,
    ProfilesComponent,
    PuestoComponent,
    CreatePuestoComponent,
    UpdatePuestoComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule
  ],
  exports: [
    VacacionesComponent,
    DespidosComponent
  ]
})
export class ModuloNominaModule { }
