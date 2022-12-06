import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VentaAdministradorComponent } from './venta-administrador.component';

describe('VentaAdministradorComponent', () => {
  let component: VentaAdministradorComponent;
  let fixture: ComponentFixture<VentaAdministradorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VentaAdministradorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VentaAdministradorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
