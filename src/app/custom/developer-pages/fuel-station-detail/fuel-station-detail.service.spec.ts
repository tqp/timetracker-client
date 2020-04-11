import { TestBed } from '@angular/core/testing';

import { FuelStationDetailService } from './fuel-station-detail.service';

describe('FuelStationDetailService', () => {
  let service: FuelStationDetailService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FuelStationDetailService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
