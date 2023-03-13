import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovimientosInicioComponent } from './movimientos-inicio.component';

describe('MovimientosInicioComponent', () => {
  let component: MovimientosInicioComponent;
  let fixture: ComponentFixture<MovimientosInicioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MovimientosInicioComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MovimientosInicioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
