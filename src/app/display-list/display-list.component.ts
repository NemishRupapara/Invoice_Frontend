import { Component, OnInit } from '@angular/core';
import { Invoice } from '../add-invoice/invoice.interface';
import { DisplayInvoiceListService } from '../Services/display-invoice-list.service';
import { Router } from '@angular/router';
import { AddInvoiceService } from '../Services/add-invoice.service';
import { UserService } from '../Services/user.service';
import { RolePermissions } from '../Interfaces/RolePermission.interface';
import { GetUserPermissionService } from '../Services/get-user-permission.service';


@Component({
  selector: 'app-display-list',
  templateUrl: './display-list.component.html',
  styleUrls: ['./display-list.component.css']
})
export class DisplayListComponent implements OnInit {
  InvoiceArray: any = [];
  UserPermission: any;
  RoleID;

  constructor(private InvoiceList: DisplayInvoiceListService, private router: Router, private invoiceservice: AddInvoiceService, private Userservice: UserService, private Perm: GetUserPermissionService) { }
  ngOnInit() {
    // const RoleID = parseInt(localStorage.getItem("RoleID"), 10);
    // console.log(RoleID);
    // this.Userservice.GetUserPermission(RoleID).subscribe(
    //   (data: RolePermissions) => {
    //     this.UserPermission = data;
    //     console.log(this.UserPermission);

    //   },
    //   (error) => {
    //     console.error('Error fetching customer list:', error);
    //   }
    // );

    this.GetPermission();

    this.RoleID = localStorage.getItem("RoleID")


  }

  async GetPermission() {
    await this.Perm.GetUserPermission();
    this.UserPermission = this.Perm.UserPermission;
    console.log("object", this.UserPermission);

    if (this.UserPermission != null) {
      this.GetInvoiceList();
    }
  }

  GetInvoiceList() {

    this.InvoiceList.GetInvoiceList().subscribe(
      (data: any) => {

        this.InvoiceArray = data;
        console.log(this.InvoiceArray);

      },
      (error) => {
        console.error('Error fetching customer list:', error);
      }
    );
  }
  GoToEdit(InvoiceID: Number) {
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate(['/EditInvoice', InvoiceID]);
    });

  }
  GoToPayment(customerName: string, remainingAmount: number) {

    this.invoiceservice.CheckSelect = customerName;
    this.invoiceservice.remainingAmount = remainingAmount;
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate(['/Payment']);
    });

  }


  DeleteInvoice(InvoiceID: Number) {
    this.invoiceservice.DeleteInvoice(InvoiceID).subscribe(() => {
      this.reloadInvoiceList();
    },
      (error) => {
        console.error('Error deleting invoice:', error);
      })

  };
  NavigateToAdd() {
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate(['/AddInvoice']);
    });
  }
  reloadInvoiceList(): void {
    this.InvoiceList.GetInvoiceList().subscribe(
      (data: Invoice[]) => {
        this.InvoiceArray = data;
        console.log('Invoice list reloaded:', this.InvoiceArray);
      },
      (error) => {
        console.error('Error fetching updated invoice list:', error);
      }
    );

  }
}