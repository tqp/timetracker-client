import { TestBed } from '@angular/core/testing';

import { IntuitSyncService } from './intuit-sync.service';

describe('IntuitSyncService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: IntuitSyncService = TestBed.get(IntuitSyncService);
    expect(service).toBeTruthy();
  });
});
