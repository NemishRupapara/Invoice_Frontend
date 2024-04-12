import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../Services/customer.service';
import { Item } from '../add-invoice/item.interface';
import { ItemName } from '../Interfaces/ItemName.interface';
import { Router } from '@angular/router';
import { UserService } from '../Services/user.service';
import { RolePermissions } from '../Interfaces/RolePermission.interface';
import { GetUserPermissionService } from '../Services/get-user-permission.service';
import { PaymentMode } from '../Interfaces/paymentmode.interface';
@Component({
  selector: 'app-payment-mode',
  templateUrl: './payment-mode.component.html',
  styleUrls: ['./payment-mode.component.css']
})
export class PaymentModeComponent implements OnInit {
  PaymentModeArray: any = [];
  ModeNames: string;
  NewModeName:string;
  ModeID: number;
  UserPermission: any;
  NewIsActive;
  IsActive;


  constructor(private Itemservice: CustomerService,private router:Router,private Userservice:UserService,private Perm:GetUserPermissionService ) { }

  ngOnInit() {
    

this.GetPermission();


   
  }


  
  async GetPermission() {
    await this.Perm.GetUserPermission();
    this.UserPermission = this.Perm.UserPermission;
    console.log("object", this.UserPermission);
    
    if (this.UserPermission != null) {
      this.GetPaymentModeList();
    }
  }

  GetPaymentModeList(){
    this.Itemservice.GetPAymentModeList().subscribe(
      (data: PaymentMode[]) => {
        this.PaymentModeArray = data;
        console.log(this.PaymentModeArray);

      },
      (error) => {
        console.error('Error fetching customer list:', error);
      }
    );
  }
  UpdateItemDetail(itemName: string,isactive:number, id: number) {
    this.ModeNames = itemName;
    this.ModeID = id;
    this.IsActive=isactive;
  }

  DeletePAymentMode(ModeID: number) {
    this.Itemservice.DeletePAymentMode(ModeID).subscribe(() => {
      this.reloadInvoiceList();
    },
      (error) => {
        console.error('Error deleting invoice:', error);
      })

  };


  EditPaymentMode() {
    const PaymentMode: PaymentMode = {
      ID: this.ModeID,
      PaymentMode: this.ModeNames,
      IsActive:this.IsActive
        }
    this.Itemservice.EditPaymentMode(PaymentMode).subscribe(() => {
      
    },
      (error) => {
        console.error('Error deleting invoice:', error);
      })
      
      this.reloadInvoiceList();
  };

  AddPaymentMode(){
    const PaymentMode: PaymentMode = {
      ID: 0,
      PaymentMode: this.NewModeName,
      IsActive:this.NewIsActive
    }
    this.Itemservice.AddPaymentMode(PaymentMode).subscribe(() => {
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
  
  this.Itemservice.GetPAymentModeList().subscribe(
    (data: PaymentMode[]) => {
      this.PaymentModeArray = data;
        
    },
    (error) => {
      console.error('Error fetching customer list:', error);
    }
  );

this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
  this.router.navigate(['/PaymentModeMethod']);
});
}

, 200);


}
}
