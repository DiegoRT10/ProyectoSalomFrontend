import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DespidosComponent } from './despidos.component';

describe('DespidosComponent', () => {
  let component: DespidosComponent;
  let fixture: ComponentFixture<DespidosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DespidosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DespidosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
