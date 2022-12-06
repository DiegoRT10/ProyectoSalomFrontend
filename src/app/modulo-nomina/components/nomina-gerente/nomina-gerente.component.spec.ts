import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NominaGerenteComponent } from './nomina-gerente.component';

describe('NominaGerenteComponent', () => {
  let component: NominaGerenteComponent;
  let fixture: ComponentFixture<NominaGerenteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NominaGerenteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NominaGerenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
