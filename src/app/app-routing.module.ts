import { DespidosComponent } from './modulo-nomina/components/despidos/despidos.component';
import { VacacionesComponent } from './modulo-nomina/components/vacaciones/vacaciones.component';
import { RoleGuard } from './guards/role.guard';
import { AuthGuard } from './guards/auth.guard';
import { LoginComponent } from './components/login/login.component';
import { HomeAdministradorComponent } from './components/home-administrador/home-administrador.component';
import { PrivateComponent } from './components/private/private.component';
import { HomeComponent } from './components/home/home.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateComponent } from './components/create/create.component';
import { ReadComponent } from './components/read/read.component';
import { UpdateComponent } from './components/update/update.component';
import { DeleteComponent } from './components/delete/delete.component';
import { HomeGerenteComponent } from './components/home-gerente/home-gerente.component';
import { HomeSistemasComponent } from './components/home-sistemas/home-sistemas.component';
import { ProfileComponent } from './modulo-nomina/components/profile/profile.component';
import { ProfilesComponent } from './modulo-nomina/components/profiles/profiles.component';
import { PuestoComponent } from './modulo-nomina/components/puesto/puesto.component';
import { CreatePuestoComponent} from './modulo-nomina/components/create-puesto/create-puesto.component';
import { UpdatePuestoComponent } from './modulo-nomina/components/update-puesto/update-puesto.component';
import { EtapaComponent } from './modulo-nomina/components/etapa/etapa.component';
import { CreateEtapaComponent } from './modulo-nomina/components/create-etapa/create-etapa.component';
import { UpdateEtapaComponent } from './modulo-nomina/components/update-etapa/update-etapa.component';
import { UpdateProfileComponent } from './modulo-nomina/components/update-profile/update-profile.component';
import { LocationsComponent } from './modulo-nomina/components/locations/locations.component';
import { CreateLocationComponent } from './modulo-nomina/components/create-location/create-location.component';
import { UpdateLocationComponent } from './modulo-nomina/components/update-location/update-location.component';
import { VentaGerenteComponent } from './modulo-venta/components/venta-gerente/venta-gerente.component';
import { NominaGerenteComponent } from './modulo-nomina/components/nomina-gerente/nomina-gerente.component';
import { VentaAdministradorComponent } from './modulo-venta/components/venta-administrador/venta-administrador.component';
import { VentaComponent } from './modulo-venta/components/venta/venta.component';




const routes: Routes = [
{path: 'home', component: HomeComponent},//puede acceder cualquier persona
{path: 'home-gerente', component: HomeGerenteComponent, canActivate: [AuthGuard, RoleGuard],  data: {expectedRole: {s:'0', g:'1'}}}, //puede acceder sistemas o gerente 
{path: 'home-sistemas', component: HomeSistemasComponent, canActivate: [AuthGuard, RoleGuard],  data: {expectedRole: {s:'0', g:'1'}}},//solo puede acceder sistemas
{path: 'private', component: PrivateComponent, canActivate: [AuthGuard, RoleGuard],  data: {expectedRole: {s:'0', g:'1'}}}, //puede acceder sistemas o gerente 
{path: 'home-administrador', component: HomeAdministradorComponent, canActivate: [AuthGuard, RoleGuard],  data: {expectedRole: {s:'0', g:'2'}}},//puede acceder sistemas o administrador
{path: 'login', component: LoginComponent},
{path: 'create', component: CreateComponent, canActivate: [AuthGuard, RoleGuard],  data: {expectedRole: {s:'0', g:'1'}}},//puede acceder sistemas o gerente
{path: 'read', component: ReadComponent, canActivate: [AuthGuard, RoleGuard],  data: {expectedRole: {s:'0', g:'1'}}},//puede acceder sistemas o gerente
{path: 'update/:id', component: UpdateComponent,canActivate: [AuthGuard, RoleGuard],  data: {expectedRole: {s:'0', g:'1'}}},//puede acceder sistemas o gerente
{path: 'delete', component: DeleteComponent,canActivate: [AuthGuard, RoleGuard],  data: {expectedRole: {s:'0', g:'1'}}},//puede acceder sistemas o gerente
{path: 'profile',component: ProfileComponent,canActivate: [AuthGuard, RoleGuard],  data: {expectedRole: {s:'0', g:'1'}}},//puede acceder sistemas o gerente
{path: 'profiles',component: ProfilesComponent,canActivate: [AuthGuard, RoleGuard],  data: {expectedRole: {s:'0', g:'1'}}},//puede acceder sistemas o gerente
{path: 'puesto',component: PuestoComponent,canActivate: [AuthGuard, RoleGuard],  data: {expectedRole: {s:'0', g:'1'}}},//puede acceder sistemas o gerente
{path: 'vacaciones', component: VacacionesComponent,canActivate: [AuthGuard, RoleGuard],  data: {expectedRole: {s:'0', g:'1'}}},//puede acceder sistemas o gerente
{path: 'despidos', component: DespidosComponent,canActivate: [AuthGuard, RoleGuard],  data: {expectedRole: {s:'0', g:'1'}}},//puede acceder sistemas o gerente
{path: 'nomina-gerente', component: NominaGerenteComponent, canActivate: [AuthGuard, RoleGuard],  data: {expectedRole: {s:'0', g:'1'}}},//puede acceder sistemas o gerente
{path: 'create-puesto', component: CreatePuestoComponent, canActivate: [AuthGuard, RoleGuard],  data: {expectedRole: {s:'0', g:'1'}}},//puede acceder sistemas o gerente
{path: 'update-puesto', component: UpdatePuestoComponent,canActivate: [AuthGuard, RoleGuard],  data: {expectedRole: {s:'0', g:'1'}}},//puede acceder sistemas o gerente
{path: 'etapa',component: EtapaComponent,canActivate: [AuthGuard, RoleGuard],  data: {expectedRole: {s:'0', g:'1'}}},//puede acceder sistemas o gerente
{path: 'create-etapa', component: CreateEtapaComponent, canActivate: [AuthGuard, RoleGuard],  data: {expectedRole: {s:'0', g:'1'}}},//puede acceder sistemas o gerente
{path: 'update-etapa', component: UpdateEtapaComponent, canActivate: [AuthGuard, RoleGuard],  data: {expectedRole: {s:'0', g:'1'}}},//puede acceder sistemas o gerente
{path: 'update-profile', component: UpdateProfileComponent, canActivate: [AuthGuard, RoleGuard],  data: {expectedRole: {s:'0', g:'1'}}},//puede acceder sistemas o gerente
{path: 'locations', component: LocationsComponent, canActivate: [AuthGuard, RoleGuard],  data: {expectedRole: {s:'0', g:'1'}}},//puede acceder sistemas o gerente
{path: 'create-location', component: CreateLocationComponent, canActivate: [AuthGuard, RoleGuard],  data: {expectedRole: {s:'0', g:'1'}}},//puede acceder sistemas o gerente
{path: 'update-location', component: UpdateLocationComponent, canActivate: [AuthGuard, RoleGuard],  data: {expectedRole: {s:'0', g:'1'}}},//puede acceder sistemas o gerente
{path: 'venta-gerente', component: VentaGerenteComponent, canActivate: [AuthGuard, RoleGuard],  data: {expectedRole: {s:'0', g:'1'}}},//puede acceder sistemas o gerente
{path: 'venta-administrador', component: VentaAdministradorComponent, canActivate: [AuthGuard, RoleGuard],  data: {expectedRole: {s:'0', g:'2'}}},//puede acceder sistemas o administrador
{path: 'venta', component: VentaComponent, canActivate: [AuthGuard, RoleGuard],  data: {expectedRole: {s:'0', g:'1'}}},//puede acceder sistemas o gerente

{path: '**', pathMatch: 'full', redirectTo: 'home'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
