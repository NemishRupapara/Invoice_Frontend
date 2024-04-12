import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EdittInvoiceComponent } from './editt-invoice.component';

describe('EdittInvoiceComponent', () => {
  let component: EdittInvoiceComponent;
  let fixture: ComponentFixture<EdittInvoiceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EdittInvoiceComponent]
    });
    fixture = TestBed.createComponent(EdittInvoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
