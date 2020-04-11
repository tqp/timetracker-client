import { TestBed } from '@angular/core/testing';

import { FuelStationListService } from './fuel-station-list.service';

describe('FuelStationListService', () => {
  let service: FuelStationListService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FuelStationListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
