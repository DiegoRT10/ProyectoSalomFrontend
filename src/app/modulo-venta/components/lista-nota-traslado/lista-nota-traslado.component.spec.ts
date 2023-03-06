import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaNotaTrasladoComponent } from './lista-nota-traslado.component';

describe('ListaNotaTrasladoComponent', () => {
  let component: ListaNotaTrasladoComponent;
  let fixture: ComponentFixture<ListaNotaTrasladoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListaNotaTrasladoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListaNotaTrasladoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
