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
import { concatMap } from 'rxjs/operators';
import { concat } from 'rxjs';

@Component({
  selector: 'app-edit-payment',
  templateUrl: './edit-payment.component.html',
  styleUrls: ['./edit-payment.component.css']
})
export class EditPaymentComponent implements OnInit {
  constructor(private addInvoiceService: AddInvoiceService, private customer: CustomerService, private router: Router) { }
  CustomerArray: any = [];
  // CustomersInvoiceList: any = [{ isSelected: false }, { NewRemaining: 0 }, { NewReceived: 0 }, { RemainingInput: 0 }];
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
  PaymentDetails: any;
  InvoicePaymentArray: any = [{ isSelected: false }, { NewRemaining: 0 }, { NewReceived: 0 }, { RemainingInput: 0 }];

  PaymentID;

  SendData: MultiplePaymentViewModel = {
    Invoice: [],
    Detail: {
      ID: 0,
      CustomerName: "",
      PaymentMode: "",
      ReferenceNo: "",
      PaymentDate: "",
      ChequeDate: "",
      BankName: "",
      Amount: 0
    },
    InvoicePayments: [],
  };

  ngOnInit(): void {


    // const today = new Date();
    // const minDate = today.toISOString().split('T')[0];
    // this.minDate = minDate;
    this.addInvoiceService.GetInvoicePaymentList().subscribe(
      (data: any[]) => {
        this.InvoicePaymentArray = data;
        this.InvoicePaymentArray.forEach(item => {
          item.paidAmount = item.paidAmount - item.singlePaidAmount;
          item.remainingAmount = item.remainingAmount + item.singlePaidAmount;
          item.leftAmount = item.remainingAmount;
          item.isSelected = true;
          item.RemainingInput = item.singlePaidAmount;
          item.NewRemaining = item.remainingAmount - item.singlePaidAmount;
        });
        console.log(this.InvoicePaymentArray);
        for (let i = 0; i < this.InvoicePaymentArray.length; i++) {
          this.selectedRows.push(i);
        }
        this.TotalremainingAmount = this.InvoicePaymentArray.reduce((total, invoice) => total + invoice.remainingAmount, 0);
        this.TotalTotalAmount = this.InvoicePaymentArray.reduce((total, invoice) => total + invoice.totalAmount, 0);
        this.TotalPaidAmount = this.InvoicePaymentArray.reduce((total, invoice) => total + invoice.paidAmount, 0);
        this.TotalLeftAmount == this.InvoicePaymentArray.reduce((total, invoice) => total + invoice.remainingAmount, 0);
        //          this.totalAmount== this.InvoicePaymentArray.reduce((total, invoice) => total + invoice.singlePaidAmount, 0);
        // console.log(this.totalAmount);
        this.showtotal = true;

      },
      (error) => {
        console.error('Error fetching customer list:', error);
      }
    );




    this.customer.GetPAymentModeList2().pipe(
      concatMap((paymentModeData: PaymentMode[]) => {
        this.PaymentModeArray = paymentModeData;
        console.log(this.PaymentModeArray);
        // Return the second observable
        return this.addInvoiceService.GetPaymentDetailForEdit();
      })
    ).subscribe(
      (paymentDetailData: any) => {
        this.PaymentDetails = paymentDetailData;
        this.PaymentMode = paymentDetailData.paymentMode;
        this.ReferenceNo = paymentDetailData.referenceNo;
        this.UserAmountInput = paymentDetailData.amount;
        this.PaymentDate = paymentDetailData.paymentDate;
        this.ChequeDate = paymentDetailData.chequeDate;
        this.BankName = paymentDetailData.bankName;
        this.PaymentID = paymentDetailData.id;
        this.totalAmount = paymentDetailData.amount;
        // this.calculateTotalSelectedAmounts(); 
        this.UpdateRemainingInput()

        // Rest of your code that depends on both data...

      },
      (error) => {
        console.error('Error fetching data:', error);
      }
    );




  }
  // GetInvoiceListByCustomer(event: Event) {
  //   const selectedValue = (event.target as HTMLSelectElement).value;
  //   const USerId = parseInt(localStorage.getItem("UserID"), 10);

  //   const dataToSend: CustomerPayment = {
  //     UserID: USerId,
  //     Customername: selectedValue
  //   };

  //   this.addInvoiceService.GetInvoiceListOfCustomer(dataToSend).subscribe(
  //     (data: CustomersInvoice[]) => {
  //       this.CustomersInvoiceList = data;
  //       console.log(this.CustomersInvoiceList);
  //       this.TotalremainingAmount = this.CustomersInvoiceList.reduce((total, invoice) => total + invoice.remainingAmount, 0);
  //       this.TotalTotalAmount = this.CustomersInvoiceList.reduce((total, invoice) => total + invoice.totalAmount, 0);
  //       this.TotalPaidAmount = this.CustomersInvoiceList.reduce((total, invoice) => total + invoice.paidAmount, 0);
  //       // this.TotalLeftAmount== this.CustomersInvoiceList.reduce((total, invoice) => total + invoice.remainingAmount, 0);
  //       this.showtotal = true;

  //     },
  //     (error) => {
  //       console.error('Error fetching customer list:', error);
  //     }
  //   );
  // }
  changedisabled() {
    if (this.PaymentMode == "Cash") {
      this.disableCheque = true;
    }
    else {
      this.disableCheque = false;

    }
  }

  onCheckboxChange(event: any, index: number) {
    // this.showValidationMessage=true;
    console.log(this.selectedRows);
    this.InvoicePaymentArray[index].isSelected = event.target.checked;
    this.InvoicePaymentArray[index].NewRemaining = this.InvoicePaymentArray[index].remainingAmount;
    console.log(" this.InvoicePaymentArray[index].remainingAmount", this.InvoicePaymentArray[index].NewRemaining);
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
      if (this.InvoicePaymentArray[index].remainingAmount > this.RemainingInput) {
        this.InvoicePaymentArray[index].RemainingInput = this.RemainingInput;
        this.RemainingInput = 0;

      }
      else if (this.InvoicePaymentArray[index].remainingAmount < this.RemainingInput) {
        this.InvoicePaymentArray[index].RemainingInput = this.InvoicePaymentArray[index].remainingAmount;
        this.RemainingInput = this.RemainingInput - this.InvoicePaymentArray[index].remainingAmount;
      }

    }
    else {
      if (this.RemainingInput < this.UserAmountInput) {
        this.RemainingInput = this.RemainingInput + this.InvoicePaymentArray[index].RemainingInput;

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
      this.InvoicePaymentArray[index].RemainingInput = 0;
    }

    setTimeout(() => {
      this.calculateTotalSelectedAmounts();
    }, 100);
  }

  UpdateRemainingInput() {
    this.RemainingInput = this.UserAmountInput
  }
  getSelectedRemainingAmount(index: number): number | undefined {
    return this.selectedRows.includes(index) ? this.InvoicePaymentArray[index].remainingAmount : undefined;
  }

  calculateTotalSelectedAmounts(): void {


    let totalAmount = 0;
    for (const index of this.selectedRows) {
      const inputValue = +(document.getElementById(`remainingAmount_${index}`) as HTMLInputElement).value;
      this.InvoicePaymentArray[index].NewRemaining = this.InvoicePaymentArray[index].remainingAmount - inputValue;
      this.InvoicePaymentArray[index].NewReceived = this.InvoicePaymentArray[index].paidAmount + inputValue;

      if (!isNaN(inputValue)) {
        totalAmount += inputValue;
        // this.TotalTotalAmount += this.CustomersInvoiceList[index].totalAmount;
        // this.TotalPaidAmount += this.CustomersInvoiceList[index].receivedAmount;
        // this.TotalremainingAmount = this.CustomersInvoiceList[index].remainingAmount;
        this.TotalLeftAmount = this.InvoicePaymentArray[index].NewRemaining;
      }
    }
    this.totalAmount = totalAmount;
    if (this.totalAmount == this.UserAmountInput && this.selectedRows.length > 0) {
      this.isDisabled = false;
      this.showValidationMessage = false;

    }
    else {
      this.isDisabled = true;
      this.showValidationMessage = true;

    }
  }
  CheckBtn() {
    // console.log(this.selectedRows);
    // console.log(this.CustomersInvoiceList[0]);
    // this.SendInvoiceList = [];
    const slected = this.InvoicePaymentArray[0];
    const dataToSend: PaymentDetails = {
      ID: this.PaymentID,
      CustomerName: slected.customerName,
      PaymentMode: this.PaymentMode,
      ReferenceNo: this.ReferenceNo,
      PaymentDate: this.PaymentDate,
      ChequeDate: this.ChequeDate,
      BankName: this.BankName,
      Amount: this.UserAmountInput
    };

    this.SendData.Detail = dataToSend;
    this.SendData.Invoice = [];
    this.SendData.InvoicePayments = [];
    for (const index of this.selectedRows) {
      const slected = this.InvoicePaymentArray[index];
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
      this.SendData.Invoice.push(data1)

      const data2: InvoicePayment = {
        ID: slected.id,
        PaymentID: slected.paymentID,
        InvoiceID: slected.invoiceID,
        InvoiceNo: slected.invoiceNo,
        CustomerName: slected.customerName,
        TotalAmount: slected.totalAmount,
        PaidAmount: slected.NewReceived,
        RemainingAmount: slected.NewRemaining,
        SinglePaidAmount: +(document.getElementById(`remainingAmount_${index}`) as HTMLInputElement).value,
        LeftAmount: slected.NewRemaining,
      };
      this.SendData.InvoicePayments.push(data2)
    }
    console.log(this.SendData);






    let thirdArray = this.InvoicePaymentArray.filter((_, index) => !this.selectedRows.includes(index));
    thirdArray.forEach(item => {
      item.singlePaidAmount = 0;

    });

    let transformedThirdArray = thirdArray.map(obj => {
      return {
        ID: obj.id,
        PaymentID: obj.paymentID,
        InvoiceID: obj.invoiceID,
        InvoiceNo: obj.invoiceNo,
        CustomerName: obj.customerName,
        TotalAmount: obj.totalAmount,
        PaidAmount: obj.paidAmount,
        RemainingAmount: obj.remainingAmount,
        SinglePaidAmount: obj.singlePaidAmount,
        LeftAmount: obj.leftAmount,

      };
    });
    this.SendData.InvoicePayments = this.SendData.InvoicePayments.concat(transformedThirdArray);

    console.log(this.SendData);




    this.addInvoiceService.EditPayment(this.SendData).subscribe(() => {
      console.log("NavigateWorking");

      this.reloadInvoiceList();
    },
      (error) => {
        console.error('Error deleting invoice:', error);
      })
  }

  reloadInvoiceList() {
    setTimeout(() => {
      this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
        this.router.navigate(['/PaymentHistory']));
    }, 200);
  }
}



