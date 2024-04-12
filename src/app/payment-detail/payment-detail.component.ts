import { Component, OnInit } from '@angular/core';
import { Customer } from '../Interfaces/Customer.interface';
import { CustomerService } from '../Services/customer.service';
import { AddInvoiceService } from '../Services/add-invoice.service';
import { Router } from '@angular/router';
import { CustomerPayment } from '../Interfaces/CustomerPayment.interface';
import { CustomersInvoice } from '../Interfaces/CustomersIncoiceList.interface';
import { PaymentMode } from '../Interfaces/paymentmode.interface';
// import { InvoicePayment } from '../Interfaces/InvoicePayment.interface';
import { MultiplePaymentViewModel } from '../Interfaces/PaymentViewModel.interface';
import { Payment } from '../Interfaces/PaymentViewModel.interface';
import { PaymentDetails } from '../Interfaces/PaymentViewModel.interface';
import { InvoicePayment } from '../Interfaces/PaymentViewModel.interface';
@Component({
  selector: 'app-payment-detail',
  templateUrl: './payment-detail.component.html',
  styleUrls: ['./payment-detail.component.css'],
})
export class PaymentDetailComponent implements OnInit {
  constructor(
    private addInvoiceService: AddInvoiceService,
    private customer: CustomerService,
    private router: Router
  ) {}
  CustomerArray: any = [];
  CustomersInvoiceList: any = [
    { isSelected: false },
    { NewRemaining: 0 },
    { NewReceived: 0 },
    { RemainingInput: 0 },
  ];
  selectedRows: number[] = [];
  // Initializing with zero
  RemainingTest;
  // SendInvoiceList: InvoicePayment[] = [];
  PaymentModeArray: any = [];
  isDisabled: boolean = true;
  showValidationMessage: boolean = false;
  validationMessage: string = 'Total Amount Must Be Equal To Entered Amount';
  UserAmountInput;
  RemainingInput;
  PaymentMode;
  ReferenceNo;
  SingleEntryAmount;
  PaymentDate;
  ChequeDate;
  BankName;
  disableCheque: boolean = false;
  minDate;
  selectedRemainingAmount: number | undefined;
  showtotal = false;
  totalAmount: number = 0;
  TotalTotalAmount = 0;
  TotalPaidAmount = 0;
  TotalremainingAmount = 0;
  TotalLeftAmount = 0;
  flag1 = false;
  CustomerNamee;
  SendData: MultiplePaymentViewModel = {
    Invoice: [],
    Detail: {
      ID: 0,
      CustomerName: '',
      PaymentMode: '',
      ReferenceNo: '',
      PaymentDate: '',
      ChequeDate: '',
      BankName: '',
      Amount: 0,
    },
    InvoicePayments: [],
  };

  ngOnInit(): void {
    const today = new Date();
    const minDate = today.toISOString().split('T')[0];
    this.minDate = minDate;
    this.customer.GetCustomerList().subscribe(
      (data: Customer[]) => {
        this.CustomerArray = data;
        // console.log(this.CustomerArray);
      },
      (error) => {
        console.error('Error fetching customer list:', error);
      }
    );

    this.customer.GetPAymentModeList2().subscribe(
      (data: PaymentMode[]) => {
        this.PaymentModeArray = data;
        console.log(this.PaymentModeArray);
      },
      (error) => {
        console.error('Error fetching customer list:', error);
      }
    );
    const shouldPreselect = this.addInvoiceService.CheckSelect;
    if (shouldPreselect != null) {
      // this.CustomerNamee=shouldPreselect;
      this.flag1 = true;
      this.UserAmountInput = this.addInvoiceService.remainingAmount;
      this.RemainingInput = this.addInvoiceService.remainingAmount;
      const selectedValue = shouldPreselect;
      this.preselectOptionAndCallAPI(selectedValue);
    }
  }

  preselectOptionAndCallAPI(selectedValue: string): void {
    // Logic to preselect an option and call API
    const selectElement = document.getElementById(
      'CustName'
    ) as HTMLSelectElement;
    if (selectElement) {
      selectElement.value = selectedValue;
    }

    // Cast the object to unknown before treating it as an Event
    const event = { target: { value: selectedValue } } as unknown;
    this.GetInvoiceListByCustomer(event as Event);
  }

  GetInvoiceListByCustomer(event: Event) {
    const selectedValue = (event.target as HTMLSelectElement).value;
    const USerId = parseInt(localStorage.getItem('UserID'), 10);

    const dataToSend: CustomerPayment = {
      UserID: USerId,
      Customername: selectedValue,
    };

    this.addInvoiceService.GetInvoiceListOfCustomer(dataToSend).subscribe(
      (data: any) => {
        this.CustomersInvoiceList = data;
        console.log(this.CustomersInvoiceList);
        console.log(
          'OOOOOOOOOOOOOOOOOOOOOOOO',
          (this.CustomerNamee = data[0].customerName)
        );
        this.TotalremainingAmount = this.CustomersInvoiceList.reduce(
          (total, invoice) => total + invoice.remainingAmount,
          0
        );
        this.TotalTotalAmount = this.CustomersInvoiceList.reduce(
          (total, invoice) => total + invoice.totalAmount,
          0
        );
        this.TotalPaidAmount = this.CustomersInvoiceList.reduce(
          (total, invoice) => total + invoice.paidAmount,
          0
        );
        // this.TotalLeftAmount== this.CustomersInvoiceList.reduce((total, invoice) => total + invoice.remainingAmount, 0);
        this.showtotal = true;
        if (this.flag1) {
          const foundObject2 = this.CustomersInvoiceList.find(
            (item) => item.remainingAmount === this.UserAmountInput
          );
          this.UpdateRemainingInput();
          foundObject2.isSelected = true;
          foundObject2.RemainingInput = this.RemainingInput;
          this.flag1 = false;
          console.log('PPPPPPPPPP', this.CustomersInvoiceList);
          this.totalAmount = this.RemainingInput;
          this.isDisabled = false;
          // this.CustomersInvoiceList.forEach(element => {
          //   if (element.remainingAmount = this.UserAmountInput) {
          //     element.isSelected = true;
          //     console.log("HHHHHHHHH",element);
          //   }
          // });
        }
      },
      (error) => {
        console.error('Error fetching customer list:', error);
      }
    );
  }
  changedisabled() {
    if (this.PaymentMode == 'Cash') {
      this.disableCheque = true;
    } else {
      this.disableCheque = false;
    }
  }

  onCheckboxChange(event: any, index: number) {
    // this.showValidationMessage=true;
    console.log(this.selectedRows);
    this.CustomersInvoiceList[index].isSelected = event.target.checked;
    this.CustomersInvoiceList[index].NewRemaining =
      this.CustomersInvoiceList[index].remainingAmount;

    if (event.target.checked) {
      this.selectedRows.push(index);
    } else {
      const selectedIndex = this.selectedRows.indexOf(index);
      if (selectedIndex !== -1) {
        this.selectedRows.splice(selectedIndex, 1);
      }
    }
    setTimeout(() => {
      this.ManageInputfield(index, event.target.checked);
    }, 100);
  }

  ManageInputfield(index: number, checked: boolean) {
    if (this.selectedRows.length == 0) {
      this.UpdateRemainingInput();
    }

    if (checked) {
      if (
        this.CustomersInvoiceList[index].remainingAmount >= this.RemainingInput
      ) {
        this.CustomersInvoiceList[index].RemainingInput = this.RemainingInput;
        this.RemainingInput = 0;
      } else if (
        this.CustomersInvoiceList[index].remainingAmount < this.RemainingInput
      ) {
        this.CustomersInvoiceList[index].RemainingInput =
          this.CustomersInvoiceList[index].remainingAmount;
        this.RemainingInput =
          this.RemainingInput -
          this.CustomersInvoiceList[index].remainingAmount;
      }
    } else {
      if (this.RemainingInput < this.UserAmountInput) {
        this.RemainingInput =
          this.RemainingInput + this.CustomersInvoiceList[index].RemainingInput;

        // for (let index of this.selectedRows) {
        //   if (this.selectedRows.length == 0) {
        //     this.UpdateRemainingInput();
        //   }
        //   else {

        //     if (this.CustomersInvoiceList[index].RemainingInput != this.CustomersInvoiceList[index].remainingAmount) {
        //       if (this.CustomersInvoiceList[index].remainingAmount > this.RemainingInput) {
        //         this.CustomersInvoiceList[index].RemainingInput = this.RemainingInput;
        //         this.RemainingInput = 0;

        //       }
        //       else if (this.CustomersInvoiceList[index].remainingAmount < this.RemainingInput) {
        //         this.CustomersInvoiceList[index].RemainingInput = this.CustomersInvoiceList[index].remainingAmount;
        //         this.RemainingInput = this.RemainingInput - this.CustomersInvoiceList[index].remainingAmount;
        //       }
        //     }
        //   }
        // }
      }
      this.CustomersInvoiceList[index].RemainingInput = 0;
    }

    setTimeout(() => {
      this.calculateTotalSelectedAmounts();
    }, 100);
  }

  UpdateRemainingInput() {
    this.RemainingInput = this.UserAmountInput;
  }
  getSelectedRemainingAmount(index: number): number | undefined {
    return this.selectedRows.includes(index)
      ? this.CustomersInvoiceList[index].remainingAmount
      : undefined;
  }

  calculateTotalSelectedAmounts(): void {
    let totalAmount = 0;
    for (const index of this.selectedRows) {
      const inputValue = +(
        document.getElementById(`remainingAmount_${index}`) as HTMLInputElement
      ).value;
      this.CustomersInvoiceList[index].NewRemaining =
        this.CustomersInvoiceList[index].remainingAmount - inputValue;
      this.CustomersInvoiceList[index].NewReceived =
        this.CustomersInvoiceList[index].paidAmount + inputValue;

      if (!isNaN(inputValue)) {
        totalAmount += inputValue;
        // this.TotalTotalAmount += this.CustomersInvoiceList[index].totalAmount;
        // this.TotalPaidAmount += this.CustomersInvoiceList[index].receivedAmount;
        // this.TotalremainingAmount = this.CustomersInvoiceList[index].remainingAmount;
        this.TotalLeftAmount = this.CustomersInvoiceList[index].NewRemaining;
      }
    }
    this.totalAmount = totalAmount;
    if (
      this.totalAmount == this.UserAmountInput &&
      this.selectedRows.length > 0
    ) {
      this.isDisabled = false;
      this.showValidationMessage = false;
    } else {
      this.isDisabled = true;
      this.showValidationMessage = true;
    }
  }
  CheckBtn() {
    // console.log(this.selectedRows);
    // console.log(this.CustomersInvoiceList[0]);
    // this.SendInvoiceList = [];
    const slected = this.CustomersInvoiceList[0];
    const dataToSend: PaymentDetails = {
      ID: 0,
      CustomerName: slected.customerName,
      PaymentMode: this.PaymentMode,
      ReferenceNo: this.ReferenceNo,
      PaymentDate: this.PaymentDate,
      ChequeDate: this.ChequeDate,
      BankName: this.BankName,
      Amount: this.UserAmountInput,
    };

    this.SendData.Detail = dataToSend;
    this.SendData.Invoice = [];
    this.SendData.InvoicePayments = [];
    for (const index of this.selectedRows) {
      const slected = this.CustomersInvoiceList[index];
      // console.log("LLLLLl",slected);

      // const dataToSend: InvoicePayment = {
      //   InvoiceID: slected.invoiceID,
      //   InvoiceNo: slected.invoiceNo,
      //   TotalAmount: slected.totalAmount,
      //   ReceivedAmount: slected.NewReceived,
      //   RemainingAmount: slected.NewRemaining,
      //   PaymentMode: this.PaymentMode,
      //   ReferenceNo: this.ReferenceNo,
      //   SingleEntryAmount: this.totalAmount,
      //   PaymentDate: this.PaymentDate,
      //   ChequeDate: this.ChequeDate,
      //   BankName: this.BankName

      // };
      const data1: Payment = {
        InvoiceID: slected.invoiceID,
        InvoiceNo: slected.invoiceNo,
        TotalAmount: slected.totalAmount,
        PaidAmount: slected.NewReceived,
        RemainingAmount: slected.NewRemaining,
      };
      this.SendData.Invoice.push(data1);

      const data2: InvoicePayment = {
        ID: 0,
        PaymentID: 0,
        InvoiceID: slected.invoiceID,
        InvoiceNo: slected.invoiceNo,
        CustomerName: slected.customerName,
        TotalAmount: slected.totalAmount,
        PaidAmount: slected.NewReceived,
        RemainingAmount: slected.NewRemaining,
        SinglePaidAmount: +(
          document.getElementById(
            `remainingAmount_${index}`
          ) as HTMLInputElement
        ).value,
        LeftAmount: slected.NewRemaining,
      };
      this.SendData.InvoicePayments.push(data2);
    }
    console.log(this.SendData);
    this.addInvoiceService.EditMultiplePayment(this.SendData).subscribe(
      () => {
        console.log('NavigateWorking');

        this.reloadInvoiceList();
      },
      (error) => {
        console.error('Error deleting invoice:', error);
      }
    );
  }

  reloadInvoiceList() {
    setTimeout(() => {
      this.router
        .navigateByUrl('/', { skipLocationChange: true })
        .then(() => this.router.navigate(['/DisplayInvoiceList']));
    }, 200);
  }
}
