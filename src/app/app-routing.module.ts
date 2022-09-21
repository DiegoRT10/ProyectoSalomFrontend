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

const routes: Routes = [
{path: 'home', component: HomeComponent},
{path: 'private', component: PrivateComponent, canActivate: [AuthGuard]},
{path: 'admin', component: AdminComponent, canActivate: [RoleGuard], data: {expectedRole: '1'}},//Gerente es de nivel '1'
{path: 'login', component: LoginComponent},
{path: 'create', component: CreateComponent},
{path: 'read', component: ReadComponent},
{path: 'update/:id', component: UpdateComponent},
{path: 'delete', component: DeleteComponent},
{path: '**', pathMatch: 'full', redirectTo: 'home'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
