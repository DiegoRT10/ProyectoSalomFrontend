import { TestBed } from '@angular/core/testing';

import { CrudPuestoService } from './crud-puesto.service';

describe('CrudPuestoService', () => {
  let service: CrudPuestoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CrudPuestoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
