import { TestBed } from '@angular/core/testing';

import { VentaDiariaService } from './venta-diaria.service';

describe('VentaDiariaService', () => {
  let service: VentaDiariaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VentaDiariaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
