import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StartEvaluacionComponent } from './start-evaluacion.component';

describe('StartEvaluacionDiagnosticaComponent', () => {
  let component: StartEvaluacionComponent;
  let fixture: ComponentFixture<StartEvaluacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StartEvaluacionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StartEvaluacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
