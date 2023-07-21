import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalificacionEvaluacionComponent } from './calificacion-evaluacion.component';

describe('CalificacionEvaluacionComponent', () => {
  let component: CalificacionEvaluacionComponent;
  let fixture: ComponentFixture<CalificacionEvaluacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CalificacionEvaluacionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CalificacionEvaluacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
