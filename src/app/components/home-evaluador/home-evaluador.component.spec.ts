import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeEvaluadorComponent } from './home-evaluador.component';

describe('HomeEvaluadorComponent', () => {
  let component: HomeEvaluadorComponent;
  let fixture: ComponentFixture<HomeEvaluadorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeEvaluadorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeEvaluadorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
