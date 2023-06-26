import { TestBed } from '@angular/core/testing';

import { ExceptionsGuard } from './exceptions.guard';

describe('ExceptionsGuard', () => {
  let guard: ExceptionsGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(ExceptionsGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
