export interface CustomersInvoice {
    InvoiceID: number;
    InvoiceNo: number;
    CustomerName: string;
    GSTNo: string;
    BillDate: string;
    DueDate: string;
    RemainingDays: number;
    Totalitem: number;
    TotalAmount: number;
    UserID: number;
    UserName: string;
    PaidAmount?: number;
    RemainingAmount?: number;
  }
  

