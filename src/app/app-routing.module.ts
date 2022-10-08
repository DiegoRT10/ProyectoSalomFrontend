import { DespidosComponent } from './modulo-nomina/components/despidos/despidos.component';
import { VacacionesComponent } from './modulo-nomina/components/vacaciones/vacaciones.component';
import { RoleGuard } from './guards/role.guard';
import { AuthGuard } from './guards/auth.guard';
import { LoginComponent } from './components/login/login.component';
import { AdminComponent } from './components/admin/admin.component';
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


const routes: Routes = [
{path: 'home', component: HomeComponent},//puede acceder cualquier persona
{path: 'home-gerente', component: HomeGerenteComponent, canActivate: [AuthGuard, RoleGuard],  data: {expectedRole: {s:'0', g:'1'}}}, //puede acceder sistemas o gerente 
{path: 'home-sistemas', component: HomeSistemasComponent, canActivate: [AuthGuard, RoleGuard],  data: {expectedRole: {s:'0', g:'0'}}},//solo puede acceder sistemas
{path: 'private', component: PrivateComponent, canActivate: [AuthGuard, RoleGuard],  data: {expectedRole: {s:'0', g:'1'}}}, //puede acceder sistemas o gerente 
{path: 'admin', component: AdminComponent, canActivate: [AuthGuard, RoleGuard],  data: {expectedRole: {s:'0', g:'2'}}},//puede acceder sistemas o administrador
{path: 'login', component: LoginComponent},
{path: 'create', component: CreateComponent},
{path: 'read', component: ReadComponent},
{path: 'update/:id', component: UpdateComponent},
{path: 'delete', component: DeleteComponent},
{path: 'profile',component: ProfileComponent},
{path: 'vacaciones', component: VacacionesComponent},
{path: 'despidos', component: DespidosComponent},
{path: '**', pathMatch: 'full', redirectTo: 'home'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
