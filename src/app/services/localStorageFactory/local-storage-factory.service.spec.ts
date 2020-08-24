import { TestBed } from '@angular/core/testing';

import { LocalStorageFactoryService } from './local-storage-factory.service';

describe('LocalStorageFactoryService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LocalStorageFactoryService = TestBed.get(LocalStorageFactoryService);
    expect(service).toBeTruthy();
  });
});
