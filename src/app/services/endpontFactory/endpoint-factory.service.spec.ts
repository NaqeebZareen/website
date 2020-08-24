import { TestBed } from '@angular/core/testing';

import { EndpointFactoryService } from './endpoint-factory.service';

describe('EndpointFactoryService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EndpointFactoryService = TestBed.get(EndpointFactoryService);
    expect(service).toBeTruthy();
  });
});
