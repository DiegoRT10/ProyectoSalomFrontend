import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListPeopleLocationsComponent } from './list-people-locations.component';

describe('ListPeopleLocationsComponent', () => {
  let component: ListPeopleLocationsComponent;
  let fixture: ComponentFixture<ListPeopleLocationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListPeopleLocationsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListPeopleLocationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
