import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VistaEvaluacionComponent } from './vista-evaluacion.component';

describe('VistaEvaluacionDiagnosticaComponent', () => {
  let component: VistaEvaluacionComponent;
  let fixture: ComponentFixture<VistaEvaluacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VistaEvaluacionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VistaEvaluacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
