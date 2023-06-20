import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VentaDiariaComponent } from './venta-diaria.component';

describe('VentaDiariaComponent', () => {
  let component: VentaDiariaComponent;
  let fixture: ComponentFixture<VentaDiariaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VentaDiariaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VentaDiariaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
