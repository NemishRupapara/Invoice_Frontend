import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../Services/customer.service';
import { Item } from '../add-invoice/item.interface';
import { Customer } from '../Interfaces/Customer.interface';
import { ItemName } from '../Interfaces/ItemName.interface';
import { Router } from '@angular/router';
import { RolePermissions } from '../Interfaces/RolePermission.interface';
import { UserService } from '../Services/user.service';
import { GetUserPermissionService } from '../Services/get-user-permission.service';

@Component({
  selector: 'app-customet-method',
  templateUrl: './customet-method.component.html',
  styleUrls: ['./customet-method.component.css']
})
export class CustometMethodComponent implements OnInit{
  CustomerArray: any = [];
  CustomerNames: string;
  NewCustomerName:string;
  CustomerId: number;
  UserPermission: any;

  constructor(private Itemservice: CustomerService,private router:Router,private Userservice:UserService,private Perm:GetUserPermissionService) { }

  ngOnInit() {


    this.GetPermission();

    
  }

  
  async GetPermission() {
    await this.Perm.GetUserPermission();
    this.UserPermission = this.Perm.UserPermission;
    console.log("object", this.UserPermission);
    
    if (this.UserPermission != null) {
      this.GetCustomerList();
    }
  }

  GetCustomerList(){
    this.Itemservice.GetCustomerList().subscribe(
      (data: Customer[]) => {
        this.CustomerArray = data;
        console.log(this.CustomerArray);

      },
      (error) => {
        console.error('Error fetching customer list:', error);
      }
    );
  }
  UpdateItemDetail(CustomerName: string, id: number) {
    this.CustomerNames = CustomerName;
    this.CustomerId = id;
  }

  DeleteCustomer(CusID: number) {
    this.Itemservice.DeleteCustomer(CusID).subscribe(() => {
      this.reloadInvoiceList();
    },
      (error) => {
        console.error('Error deleting invoice:', error);
      })

  };


  EditCustomerName() {
    const Customer: Customer = {
      ID: this.CustomerId,
      Customername: this.CustomerNames
    }
    this.Itemservice.EditCustomer(Customer).subscribe(() => {
      
    },
      (error) => {
        console.error('Error deleting invoice:', error);
      })
      
      this.reloadInvoiceList();
  };

  AddCustomer(){
    const Customer: Customer = {
      ID: 0,
      Customername: this.NewCustomerName
    }
    this.Itemservice.AddCustomer(Customer).subscribe(() => {
    },
      (error) => {
        console.error('Error deleting invoice:', error);
      })
      this.reloadInvoiceList();

  }


  reloadInvoiceList() {
    document.getElementById("Close").click();
    document.getElementById("Close2").click();


setTimeout(() => {
  
  this.Itemservice.GetCustomerList().subscribe(
    (data: Customer[]) => {
      this.CustomerArray = data;
        
    },
    (error) => {
      console.error('Error fetching customer list:', error);
    }
  );

this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
  this.router.navigate(['/CustomerMethod']);
});
}

, 200);


}

}
