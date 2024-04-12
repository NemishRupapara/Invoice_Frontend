export interface MultiplePaymentViewModel {
    Invoice: Payment[];
    Detail: PaymentDetails;
    InvoicePayments?: InvoicePayment[];
  }
  
  export interface Payment {
    InvoiceID?: number;
    InvoiceNo?: number;
    TotalAmount?: number;
    PaidAmount?: number;
    RemainingAmount?: number;
  }
  
  export interface PaymentDetails {
    ID: number;
    CustomerName?: string;
    PaymentMode?: string;
    ReferenceNo?: string;
    PaymentDate?: string;
    ChequeDate?: string;
    BankName?: string;
    Amount: number;
  }
  
  export interface InvoicePayment {
    ID: number;
    PaymentID: number;
    InvoiceID?: number;
    InvoiceNo?: number;
    CustomerName?: string;
    TotalAmount?: number;
    PaidAmount?: number;
    RemainingAmount?: number;
    SinglePaidAmount: number;
    LeftAmount: number;
  }
  