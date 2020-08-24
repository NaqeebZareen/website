import { TestBed } from '@angular/core/testing';

import { LoggingService } from './logging-service.service';

describe('LoggingServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LoggingService = TestBed.get(LoggingService);
    expect(service).toBeTruthy();
  });
});
