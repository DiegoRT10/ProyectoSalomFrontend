import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MapaComponent } from './components/mapa/mapa.component';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { NgxGaugeModule } from 'ngx-gauge';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { CdkAccordionModule } from '@angular/cdk/accordion';
import { MdbAccordionModule } from 'mdb-angular-ui-kit/accordion';
import { NgbTypeaheadModule } from '@ng-bootstrap/ng-bootstrap';
import { CatalogoComponent } from './components/catalogo/catalogo.component';



@NgModule({
  declarations: [
    MapaComponent,
    CatalogoComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    NgxChartsModule,
    NgxGaugeModule,
    MatSlideToggleModule,
    DragDropModule,
    CdkAccordionModule,
    MdbAccordionModule,
    NgbTypeaheadModule
  ]
})
export class ModuloDistribuidoraModule { }
