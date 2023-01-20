import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovimientosAdministradorComponent } from './movimientos-administrador.component';

describe('MovimientosAdministradorComponent', () => {
  let component: MovimientosAdministradorComponent;
  let fixture: ComponentFixture<MovimientosAdministradorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MovimientosAdministradorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MovimientosAdministradorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
