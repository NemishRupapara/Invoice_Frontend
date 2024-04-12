import { Component, OnInit } from '@angular/core';
import { Invoice } from './invoice.interface';
import { Item } from './item.interface';
import { CombineInvoice } from './CombineInvoice.interface';
import { AddInvoiceService } from '../Services/add-invoice.service';
import { Customer } from '../Interfaces/Customer.interface';
import { CustomerService } from '../Services/customer.service';
import { Router } from '@angular/router';
import { UserService } from '../Services/user.service';

@Component({
  selector: 'app-add-invoice',
  templateUrl: './add-invoice.component.html',
  styleUrls: ['./add-invoice.component.css'],
})
export class AddInvoiceComponent implements OnInit {
  addFlag: number = 1;
  updateFlag: number = 0;
  EditIndex: number = 0;
  constructor(
    private addInvoiceService: AddInvoiceService,
    private customer: CustomerService,
    private router: Router,
    private User: UserService
  ) {}

  // CustomerArray:Customer[]=[];
  CustomerArray: any = [];
  ItemArray: any = [];
  NewInvoice: CombineInvoice = {
    Invoice: {
      InvoiceID: 0,
      InvoiceNo: 0,
      CustomerName: '',
      GSTNo: '',
      BillDate: '',
      DueDate: '',
      RemainingDays: 0,
      Totalitem: 0,
      TotalAmount: 0,
      UserID: 0,
      UserName: '',
    },
    Item: [],
  };
  SingleItem: Item = {
    ID: 0,
    Item: '',
    Quantity: 0,
    Rate: 0,
    Amount: 0,
    InvoiceID: 0,
  };

  minDate!: string;
  ngOnInit() {
    this.NewInvoice.Invoice.UserID = this.User.Userdetails.UserID;
    const today = new Date();
    const minDate = today.toISOString().split('T')[0];
    this.NewInvoice.Invoice.BillDate = minDate;
    this.NewInvoice.Invoice.DueDate = minDate;
    this.NewInvoice.Invoice.RemainingDays = 0;
    this.setMinDate();

    this.customer.GetCustomerList().subscribe(
      (data: Customer[]) => {
        this.CustomerArray = data;
        // console.log(this.CustomerArray);
      },
      (error) => {
        console.error('Error fetching customer list:', error);
      }
    );

    this.customer.GetItemList().subscribe(
      (data: Item[]) => {
        this.ItemArray = data;
        console.log(this.ItemArray);
      },
      (error) => {
        console.error('Error fetching customer list:', error);
      }
    );
  }

  setMinDate() {
    const today = new Date();
    this.minDate = today.toISOString().split('T')[0];
  }
  updateDueDate() {
    const billDateObj = new Date(this.NewInvoice.Invoice.BillDate);
    if (
      !isNaN(this.NewInvoice.Invoice.RemainingDays) &&
      billDateObj instanceof Date &&
      !isNaN(billDateObj.getTime())
    ) {
      const dueDate = new Date(billDateObj);
      dueDate.setDate(
        billDateObj.getDate() + this.NewInvoice.Invoice.RemainingDays
      );
      this.NewInvoice.Invoice.DueDate = dueDate.toISOString().split('T')[0];
    }
  }

  calculateDays() {
    const billDateObj = new Date(this.NewInvoice.Invoice.BillDate);
    const dueDateObj = new Date(this.NewInvoice.Invoice.DueDate);
    if (
      billDateObj instanceof Date &&
      !isNaN(billDateObj.getTime()) &&
      dueDateObj instanceof Date &&
      !isNaN(dueDateObj.getTime())
    ) {
      const timeDifference = dueDateObj.getTime() - billDateObj.getTime();
      const daysDifference = Math.floor(timeDifference / (1000 * 3600 * 24));
      this.NewInvoice.Invoice.RemainingDays = daysDifference;
    }
  }

  testfunc() {
    this.CalculateTotalItem();
    this.CalculateTotalAmount();
    console.log(this.NewInvoice);

    const dataToSend: CombineInvoice = {
      Invoice: this.NewInvoice.Invoice,
      Item: this.NewInvoice.Item,
    };

    // Call your API service to send the data
    this.addInvoiceService.addInvoice(dataToSend).subscribe(
      (response) => {
        console.log('API response:', response);
      },
      (error) => {
        console.error('API error:', error);
      }
    );

    this.SingleItem = {
      ID: 0,
      Item: '',
      Quantity: 0,
      Rate: 0,
      Amount: 0,
      InvoiceID: 0,
    };
    this.NewInvoice = {
      Invoice: {
        InvoiceID: 0,
        InvoiceNo: 0,
        CustomerName: '',
        GSTNo: '',
        BillDate: '',
        DueDate: '',
        RemainingDays: 0,
        Totalitem: 0,
        TotalAmount: 0,
        UserID: this.User.Userdetails.UserID,
        UserName: '',
      },
      Item: [],
    };
    // this.router.navigate(['/DisplayInvoiceList']);
    this.ReloadInvoiceList();
  }
  AddItem() {
    this.NewInvoice.Item.push(this.SingleItem);
    this.SingleItem = {
      ID: 0,
      Item: '',
      Quantity: 0,
      Rate: 0,
      Amount: 0,
      InvoiceID: 0,
    };
    this.addFlag = 1;
    this.updateFlag = 0;
    this.CalculateTotalAmount();
  }
  Qtychange() {
    this.SingleItem.Amount = this.SingleItem.Quantity! * this.SingleItem.Rate!;
  }

  AmountChange() {
    this.SingleItem.Rate = this.SingleItem.Amount! / this.SingleItem.Quantity!;
  }

  Deleteitem(Index: number) {
    this.NewInvoice.Item.splice(Index, 1);
    this.CalculateTotalAmount();
  }

  Edititem(Index: number) {
    this.addFlag = 0;
    this.updateFlag = 1;
    this.EditIndex = Index;
    this.SingleItem = { ...this.NewInvoice.Item[Index] };
    this.CalculateTotalAmount();
  }

  UpdateItem() {
    this.NewInvoice.Item[this.EditIndex] = this.SingleItem;
    this.SingleItem = {
      ID: 0,
      Item: '',
      Quantity: 0,
      Rate: 0,
      Amount: 0,
      InvoiceID: 0,
    };
    this.addFlag = 1;
    this.updateFlag = 0;
    this.CalculateTotalAmount();
  }

  CalculateTotalItem() {
    this.NewInvoice.Item.forEach(() => {
      this.NewInvoice.Invoice.Totalitem = this.NewInvoice.Invoice.Totalitem + 1;
    });
  }

  CalculateTotalAmount() {
    this.NewInvoice.Invoice.TotalAmount = this.NewInvoice.Item.reduce(
      (total, item) => {
        return total + (item.Amount || 0);
      },
      0
    );
  }

  ReloadInvoiceList() {
    setTimeout(() => {
      this.router
        .navigateByUrl('/', { skipLocationChange: true })
        .then(() => this.router.navigate(['/DisplayInvoiceList']));
    }, 200);
  }
}
