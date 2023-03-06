import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleNotaTrasladoComponent } from './detalle-nota-traslado.component';

describe('DetalleNotaTrasladoComponent', () => {
  let component: DetalleNotaTrasladoComponent;
  let fixture: ComponentFixture<DetalleNotaTrasladoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetalleNotaTrasladoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetalleNotaTrasladoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
