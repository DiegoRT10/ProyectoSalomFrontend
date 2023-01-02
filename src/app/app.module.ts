import { ModuloNominaModule } from './modulo-nomina/modulo-nomina.module';
import { ModuloVentaModule } from './modulo-venta/modulo-venta.module';
import { TokenInterceptorService } from './services/token-interceptor.service';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { PrivateComponent } from './components/private/private.component';
import { HomeAdministradorComponent } from './components/home-administrador/home-administrador.component';
import { LoginComponent } from './components/login/login.component';

//Herramientas
import { FormsModule } from '@angular/forms';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { JwtHelperService, JWT_OPTIONS } from '@auth0/angular-jwt';
import { CreateComponent } from './components/create/create.component';
import { ReadComponent } from './components/read/read.component';
import { UpdateComponent } from './components/update/update.component';
import { DeleteComponent } from './components/delete/delete.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HomeGerenteComponent } from './components/home-gerente/home-gerente.component';
import { InformationComponent } from './components/information/information.component';
import { HomeSistemasComponent } from './components/home-sistemas/home-sistemas.component';
import { LoadingComponent } from './loading/loading.component';








@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PrivateComponent,
    LoginComponent,
    CreateComponent,
    ReadComponent,
    UpdateComponent,
    DeleteComponent,
    HomeGerenteComponent,
    InformationComponent,
    HomeSistemasComponent,
    HomeAdministradorComponent,
    LoadingComponent,
    
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    ModuloNominaModule,
    ModuloVentaModule,
    
    
  ],
  providers: [
    //JWT
    {provide: JWT_OPTIONS, 
    useValue:  JWT_OPTIONS},
    JwtHelperService,
    //Token Interceptor
    {provide: HTTP_INTERCEPTORS,useClass: TokenInterceptorService,multi:true},
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
