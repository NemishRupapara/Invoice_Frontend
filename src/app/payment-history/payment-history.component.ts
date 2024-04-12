import { Component, OnInit } from '@angular/core';
import { AddInvoiceService } from '../Services/add-invoice.service';
import { PaymentDetails } from '../Interfaces/PaymentViewModel.interface';
import { Route, Router } from '@angular/router';
import { GetUserPermissionService } from '../Services/get-user-permission.service';

@Component({
  selector: 'app-payment-history',
  templateUrl: './payment-history.component.html',
  styleUrls: ['./payment-history.component.css'],
})
export class PaymentHistoryComponent implements OnInit {
  PaymentDetailsArray: any = [];
  UserPermission: any;

  constructor(
    private Payment: AddInvoiceService,
    private router: Router,
    private Perm: GetUserPermissionService
  ) { }
  ngOnInit() {
    this.GetPermission();
  }

  async GetPermission() {
    await this.Perm.GetUserPermission();
    this.UserPermission = this.Perm.UserPermission;
    console.log('object', this.UserPermission);

    if (this.UserPermission != null) {
      this.GetPaymentDetailList();
    }
  }

  NavigateToAdd() {
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate(['/Payment']);
    });
  }

  GetPaymentDetailList() {
    this.Payment.GetAllPaymentDetailList().subscribe(
      (data: PaymentDetails[]) => {
        this.PaymentDetailsArray = data;
        console.log(this.PaymentDetailsArray);
      },
      (error) => {
        console.error('Error fetching customer list:', error);
      }
    );
  }

  DeletePayment(PaymentID: number) {
    this.Payment.DeletePAyment(PaymentID).subscribe(
      () => {
        setTimeout(() => {
          this.router
            .navigateByUrl('/', { skipLocationChange: true })
            .then(() => this.router.navigate(['/PaymentHistory']));
        }, 100);
      },
      (error) => {
        console.error('Error deleting invoice:', error);
      }
    );
  }

  GotoEditPayment(id: number) {
    this.Payment.PaymentID = id;
    console.log(this.Payment.PaymentID);
    setTimeout(() => {
      this.router
        .navigateByUrl('/', { skipLocationChange: true })
        .then(() => this.router.navigate(['/EditPayment']));
    }, 100);
  }
}
