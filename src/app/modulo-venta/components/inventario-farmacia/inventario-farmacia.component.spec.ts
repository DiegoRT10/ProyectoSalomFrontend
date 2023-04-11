import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InventarioFarmaciaComponent } from './inventario-farmacia.component';

describe('InventarioFarmaciaComponent', () => {
  let component: InventarioFarmaciaComponent;
  let fixture: ComponentFixture<InventarioFarmaciaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InventarioFarmaciaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InventarioFarmaciaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
