import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeSistemasComponent } from './home-sistemas.component';

describe('HomeSistemasComponent', () => {
  let component: HomeSistemasComponent;
  let fixture: ComponentFixture<HomeSistemasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeSistemasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeSistemasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
