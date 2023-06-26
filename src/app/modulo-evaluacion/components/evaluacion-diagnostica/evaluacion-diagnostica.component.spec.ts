import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EvaluacionDiagnosticaComponent } from './evaluacion-diagnostica.component';

describe('EvaluacionDiagnosticaComponent', () => {
  let component: EvaluacionDiagnosticaComponent;
  let fixture: ComponentFixture<EvaluacionDiagnosticaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EvaluacionDiagnosticaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EvaluacionDiagnosticaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
