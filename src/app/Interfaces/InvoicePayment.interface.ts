export interface InvoicePayment {
    InvoiceID?: number;
    InvoiceNo?: number;
    TotalAmount?: number;
    ReceivedAmount?: number;
    RemainingAmount?: number;
    PaymentMode:string;
    ReferenceNo:string;
    SingleEntryAmount?: number;
    PaymentDate:string;
    ChequeDate :string;
    BankName:string;
  }
  