import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StartEvaluacionDiagnosticaComponent } from './start-evaluacion-diagnostica.component';

describe('StartEvaluacionDiagnosticaComponent', () => {
  let component: StartEvaluacionDiagnosticaComponent;
  let fixture: ComponentFixture<StartEvaluacionDiagnosticaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StartEvaluacionDiagnosticaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StartEvaluacionDiagnosticaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
