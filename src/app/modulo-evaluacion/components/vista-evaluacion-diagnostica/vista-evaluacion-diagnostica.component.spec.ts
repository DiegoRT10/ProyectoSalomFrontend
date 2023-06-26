import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VistaEvaluacionDiagnosticaComponent } from './vista-evaluacion-diagnostica.component';

describe('VistaEvaluacionDiagnosticaComponent', () => {
  let component: VistaEvaluacionDiagnosticaComponent;
  let fixture: ComponentFixture<VistaEvaluacionDiagnosticaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VistaEvaluacionDiagnosticaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VistaEvaluacionDiagnosticaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
