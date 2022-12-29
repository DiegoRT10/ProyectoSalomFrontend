import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EstimuloGerenteComponent } from './estimulo-gerente.component';

describe('EstimuloGerenteComponent', () => {
  let component: EstimuloGerenteComponent;
  let fixture: ComponentFixture<EstimuloGerenteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EstimuloGerenteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EstimuloGerenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
