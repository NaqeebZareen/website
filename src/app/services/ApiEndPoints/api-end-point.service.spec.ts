import { TestBed } from '@angular/core/testing';

import { ApiEndPointService } from './api-end-point.service';

describe('ApiEndPointService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ApiEndPointService = TestBed.get(ApiEndPointService);
    expect(service).toBeTruthy();
  });
});
