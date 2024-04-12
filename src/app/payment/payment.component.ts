import { Component,OnInit } from '@angular/core';
import { Invoice } from '../add-invoice/invoice.interface';
import { Item } from '../add-invoice/item.interface';
import { CombineInvoice } from '../add-invoice/CombineInvoice.interface';
import { AddInvoiceService } from '../Services/add-invoice.service';
import { Customer } from '../Interfaces/Customer.interface';
import { CustomerService } from '../Services/customer.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Payment } from '../Interfaces/Payment.interface';
@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent {
  constructor(private addInvoiceService: AddInvoiceService,private customer:CustomerService,private router: Router,private activatedroute:ActivatedRoute) { }
  InvoiceId;
  PaymenTdetail:any;
  ReceivedAmount;
  RemainingAmount;
  ReceivedAmount2;
  RemainingAmount2;
  ngOnInit() {

    this.InvoiceId= this.activatedroute.snapshot.paramMap.get('InvoiceId');
    this.addInvoiceService.GetSinglePaymentDetail(this.InvoiceId).subscribe((data: any) => {
      this.PaymenTdetail=data;
      this.ReceivedAmount=  data.receivedAmount;
      this.RemainingAmount=  data.remainingAmount;
      this.ReceivedAmount2=  data.receivedAmount;
      this.RemainingAmount2=  data.remainingAmount;


console.log("Payment",data);
    });
  }


  UpdatePayment(){
    console.log("Recieved",this.ReceivedAmount+this.RemainingAmount);
    console.log("Remaining",this.RemainingAmount2-this.RemainingAmount);

    const dataToSend: Payment = {
      InvoiceID:this.PaymenTdetail.invoiceID,
      InvoiceNo:this.PaymenTdetail.invoiceNo,
      TotalAmount:this.PaymenTdetail.totalAmount,
      ReceivedAmount:this.ReceivedAmount+this.RemainingAmount,
      RemainingAmount:this.RemainingAmount2-this.RemainingAmount
    };
    console.log("DataTOSEND");
    console.log(dataToSend);


    this.addInvoiceService.EditSinglePayment(dataToSend).subscribe(() => {
      console.log("NavigateWorking");

      this.reloadInvoiceList();
    },
      (error) => {
        console.error('Error deleting invoice:', error);
      })


    // this.addInvoiceService.EditSinglePayment(dataToSend).subscribe(
    //   response => {
    //     console.log('API response:', response);
    //   },
    //   error => {
    //     console.error('API error:', error);
    //   }
    // );

  }

  reloadInvoiceList(){
    setTimeout(() => {
      this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
      this.router.navigate(['/DisplayInvoiceList']));
     }, 200);
  }
}
