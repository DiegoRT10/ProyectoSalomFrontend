import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EvaluacionComponent } from './components/evaluacion/evaluacion.component';
import { CdkAccordionModule } from '@angular/cdk/accordion';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { FormsModule } from '@angular/forms';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbTypeaheadModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { MdbAccordionModule } from 'mdb-angular-ui-kit/accordion';
import { NgxGaugeModule } from 'ngx-gauge';
import { StartEvaluacionComponent } from './components/start-evaluacion/start-evaluacion.component';
import { VistaEvaluacionComponent } from './components/vista-evaluacion/vista-evaluacion.component';






@NgModule({
  declarations: [
    EvaluacionComponent,
    StartEvaluacionComponent,
    VistaEvaluacionComponent
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
    NgbTypeaheadModule,
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class ModuloEvaluacionModule { }
