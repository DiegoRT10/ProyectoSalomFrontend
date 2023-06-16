import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VacacionesComponent } from './components/vacaciones/vacaciones.component';
import { DespidosComponent } from './components/despidos/despidos.component';
import { ProfileComponent } from './components/profile/profile.component';
import { ProfilesComponent } from './components/profiles/profiles.component';
import { PuestoComponent } from './components/puesto/puesto.component';
import { CreatePuestoComponent } from './components/create-puesto/create-puesto.component';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgbTypeaheadModule } from '@ng-bootstrap/ng-bootstrap';
import { UpdatePuestoComponent } from './components/update-puesto/update-puesto.component';
import { CreateEtapaComponent } from './components/create-etapa/create-etapa.component';
import { EtapaComponent } from './components/etapa/etapa.component';
import { UpdateEtapaComponent } from './components/update-etapa/update-etapa.component';
import { UpdateProfileComponent } from './components/update-profile/update-profile.component';
import { LocationsComponent } from './components/locations/locations.component';
import { CreateLocationComponent } from './components/create-location/create-location.component';
import { UpdateLocationComponent } from './components/update-location/update-location.component';
import { NominaGerenteComponent } from './components/nomina-gerente/nomina-gerente.component';
import { LoadingComponent } from './components/loading/loading.component';
import { PeopleLocationsComponent } from './components/people-locations/people-locations.component';
import { ListPeopleLocationsComponent } from './components/list-people-locations/list-people-locations.component';
import { AboutMeComponent } from './components/about-me/about-me.component';




@NgModule({
  declarations: [
    VacacionesComponent,
    DespidosComponent,
    ProfileComponent,
    ProfilesComponent,
    PuestoComponent,
    CreatePuestoComponent,
    UpdatePuestoComponent,
    CreateEtapaComponent,
    EtapaComponent,
    UpdateEtapaComponent,
    UpdateProfileComponent,
    LocationsComponent,
    CreateLocationComponent,
    UpdateLocationComponent,
    NominaGerenteComponent,
    LoadingComponent,
    PeopleLocationsComponent,
    ListPeopleLocationsComponent,
    AboutMeComponent,

  ],
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    NgbTypeaheadModule
  ],
  exports: [
    VacacionesComponent,
    DespidosComponent
  ]
})
export class ModuloNominaModule { }
