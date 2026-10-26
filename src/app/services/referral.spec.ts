import { TestBed } from '@angular/core/testing';

import { Referral } from './referral';

describe('Referral', () => {
  let service: Referral;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Referral);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
