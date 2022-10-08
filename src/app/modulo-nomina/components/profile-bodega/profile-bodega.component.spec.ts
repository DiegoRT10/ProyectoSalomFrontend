import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileBodegaComponent } from './profile-bodega.component';

describe('ProfileBodegaComponent', () => {
  let component: ProfileBodegaComponent;
  let fixture: ComponentFixture<ProfileBodegaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfileBodegaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfileBodegaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
