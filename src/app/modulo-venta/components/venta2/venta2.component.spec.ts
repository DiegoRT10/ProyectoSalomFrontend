import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Venta2Component } from './venta2.component';

describe('Venta2Component', () => {
  let component: Venta2Component;
  let fixture: ComponentFixture<Venta2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Venta2Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Venta2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
