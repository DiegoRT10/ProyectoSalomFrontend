import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotaTrasladoComponent } from './nota-traslado.component';

describe('NotaTrasladoComponent', () => {
  let component: NotaTrasladoComponent;
  let fixture: ComponentFixture<NotaTrasladoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NotaTrasladoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NotaTrasladoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
