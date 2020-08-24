import { TestBed } from '@angular/core/testing';

import { PaymentService } from './payment-service.service';
// import { from } from 'rxjs';
describe('PaymentServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PaymentService = TestBed.get(PaymentService);
    expect(service).toBeTruthy();
  });
});
