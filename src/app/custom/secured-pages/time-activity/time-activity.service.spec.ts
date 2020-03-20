import { TestBed } from '@angular/core/testing';

import { TimeActivityService } from './time-activity.service';

describe('TimeActivityService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TimeActivityService = TestBed.get(TimeActivityService);
    expect(service).toBeTruthy();
  });
});
