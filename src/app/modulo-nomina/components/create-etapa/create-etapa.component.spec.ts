import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateEtapaComponent } from './create-etapa.component';

describe('CreateEtapaComponent', () => {
  let component: CreateEtapaComponent;
  let fixture: ComponentFixture<CreateEtapaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateEtapaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateEtapaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
