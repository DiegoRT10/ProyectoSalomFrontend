import { TestBed } from '@angular/core/testing';

import { PeopleLocationService } from './people-location.service';

describe('PeopleLocationService', () => {
  let service: PeopleLocationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PeopleLocationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
