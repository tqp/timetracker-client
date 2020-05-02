import { TestBed } from '@angular/core/testing';

import { FuelActivityTwoService } from './fuel-activity-two.service';

describe('FuelActivityTwoService', () => {
  let service: FuelActivityTwoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FuelActivityTwoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
