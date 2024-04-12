import { TestBed } from '@angular/core/testing';

import { AddInvoiceService } from './add-invoice.service';

describe('AddInvoiceService', () => {
  let service: AddInvoiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AddInvoiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
