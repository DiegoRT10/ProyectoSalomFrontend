import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PeopleLocationsComponent } from './people-locations.component';

describe('PeopleLocationsComponent', () => {
  let component: PeopleLocationsComponent;
  let fixture: ComponentFixture<PeopleLocationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PeopleLocationsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PeopleLocationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
