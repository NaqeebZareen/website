import { TestBed } from '@angular/core/testing';

import { GoogleMapApiService } from './google-map-api.service';

describe('GoogleMapApiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GoogleMapApiService = TestBed.get(GoogleMapApiService);
    expect(service).toBeTruthy();
  });
});
