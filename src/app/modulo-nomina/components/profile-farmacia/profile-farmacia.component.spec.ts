import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileFarmaciaComponent } from './profile-farmacia.component';

describe('ProfileFarmaciaComponent', () => {
  let component: ProfileFarmaciaComponent;
  let fixture: ComponentFixture<ProfileFarmaciaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfileFarmaciaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfileFarmaciaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
