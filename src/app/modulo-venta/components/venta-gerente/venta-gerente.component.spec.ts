import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VentaGerenteComponent } from './venta-gerente.component';

describe('VentaGerenteComponent', () => {
  let component: VentaGerenteComponent;
  let fixture: ComponentFixture<VentaGerenteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VentaGerenteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VentaGerenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
