import { TestBed } from '@angular/core/testing';

import { DisplayInvoiceListService } from './display-invoice-list.service';

describe('DisplayInvoiceListService', () => {
  let service: DisplayInvoiceListService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DisplayInvoiceListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
