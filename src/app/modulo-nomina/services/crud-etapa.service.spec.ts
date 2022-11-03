import { TestBed } from '@angular/core/testing';

import { CrudEtapaService } from './crud-etapa.service';

describe('CrudEtapaService', () => {
  let service: CrudEtapaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CrudEtapaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
