import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatePuestoComponent } from './create-puesto.component';

describe('CreatePuestoComponent', () => {
  let component: CreatePuestoComponent;
  let fixture: ComponentFixture<CreatePuestoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreatePuestoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreatePuestoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should createPuesto', () => {
    expect(component).toBeTruthy();
  });
});
