import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EvaluacionBodegaComponent } from './evaluacion-bodega.component';

describe('EvaluacionBodegaComponent', () => {
  let component: EvaluacionBodegaComponent;
  let fixture: ComponentFixture<EvaluacionBodegaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EvaluacionBodegaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EvaluacionBodegaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
