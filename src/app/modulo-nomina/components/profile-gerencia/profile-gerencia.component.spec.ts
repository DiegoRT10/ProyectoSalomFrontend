import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileGerenciaComponent } from './profile-gerencia.component';

describe('ProfileGerenciaComponent', () => {
  let component: ProfileGerenciaComponent;
  let fixture: ComponentFixture<ProfileGerenciaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfileGerenciaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfileGerenciaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
