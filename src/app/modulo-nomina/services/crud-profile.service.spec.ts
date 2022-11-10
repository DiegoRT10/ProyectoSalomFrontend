import { TestBed } from '@angular/core/testing';

import { CrudProfileService } from './crud-profile.service';

describe('CrudProfileService', () => {
  let service: CrudProfileService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CrudProfileService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
