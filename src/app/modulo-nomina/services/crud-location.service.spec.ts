import { TestBed } from '@angular/core/testing';

import { CrudLocationService } from './crud-location.service';

describe('CrudLocationService', () => {
  let service: CrudLocationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CrudLocationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
