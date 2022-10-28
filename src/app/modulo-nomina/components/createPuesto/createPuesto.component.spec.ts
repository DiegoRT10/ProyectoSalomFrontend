import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatePuestoComponent } from './createPuesto.component';

describe('CreateComponent', () => {
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

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
