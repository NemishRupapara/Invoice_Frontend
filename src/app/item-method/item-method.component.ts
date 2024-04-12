import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../Services/customer.service';
import { Item } from '../add-invoice/item.interface';
import { ItemName } from '../Interfaces/ItemName.interface';
import { Router } from '@angular/router';
import { UserService } from '../Services/user.service';
import { RolePermissions } from '../Interfaces/RolePermission.interface';
import { GetUserPermissionService } from '../Services/get-user-permission.service';

@Component({
  selector: 'app-item-method',
  templateUrl: './item-method.component.html',
  styleUrls: ['./item-method.component.css']
})
export class ItemMethodComponent implements OnInit {
  ItemArray: any = [];
  ItemNames: string;
  NewItemName:string;
  ItemID: number;
  UserPermission: any;


  constructor(private Itemservice: CustomerService,private router:Router,private Userservice:UserService,private Perm:GetUserPermissionService ) { }

  ngOnInit() {
    

this.GetPermission();


   
  }


  
  async GetPermission() {
    await this.Perm.GetUserPermission();
    this.UserPermission = this.Perm.UserPermission;
    console.log("object", this.UserPermission);
    
    if (this.UserPermission != null) {
      this.GetItemList();
    }
  }

  GetItemList(){
    this.Itemservice.GetItemList().subscribe(
      (data: Item[]) => {
        this.ItemArray = data;
        console.log(this.ItemArray);

      },
      (error) => {
        console.error('Error fetching customer list:', error);
      }
    );
  }
  UpdateItemDetail(itemName: string, id: number) {
    this.ItemNames = itemName;
    this.ItemID = id;
  }

  DeleteItemName(InvoiceID: number) {
    this.Itemservice.DeleteItem(InvoiceID).subscribe(() => {
      this.reloadInvoiceList();
    },
      (error) => {
        console.error('Error deleting invoice:', error);
      })

  };


  EditItemName() {
    const Item: ItemName = {
      ID: this.ItemID,
      Item_Name: this.ItemNames
    }
    this.Itemservice.EditItem(Item).subscribe(() => {
      
    },
      (error) => {
        console.error('Error deleting invoice:', error);
      })
      
      this.reloadInvoiceList();
  };

  AddItemName(){
    const Item: ItemName = {
      ID: 0,
      Item_Name: this.NewItemName
    }
    this.Itemservice.AddItem(Item).subscribe(() => {
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
  
  this.Itemservice.GetItemList().subscribe(
    (data: Item[]) => {
      this.ItemArray = data;
        
    },
    (error) => {
      console.error('Error fetching customer list:', error);
    }
  );

this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
  this.router.navigate(['/ItemMethod']);
});
}

, 200);


}
}
