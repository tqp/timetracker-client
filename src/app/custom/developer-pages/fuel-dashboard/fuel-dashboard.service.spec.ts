import { TestBed } from '@angular/core/testing';

import { FuelDashboardService } from './fuel-dashboard.service';

describe('FuelDashboardService', () => {
  let service: FuelDashboardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FuelDashboardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
