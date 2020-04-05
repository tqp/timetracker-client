import { TestBed } from '@angular/core/testing';

import { MyDashboardService } from './my-dashboard.service';

describe('MyDashboardService', () => {
  let service: MyDashboardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MyDashboardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
