import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateEtapaComponent } from './update-etapa.component';

describe('UpdateEtapaComponent', () => {
  let component: UpdateEtapaComponent;
  let fixture: ComponentFixture<UpdateEtapaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateEtapaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateEtapaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
