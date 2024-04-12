import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../Services/customer.service';
import { Item } from '../add-invoice/item.interface';
import { ItemName } from '../Interfaces/ItemName.interface';
import { Router } from '@angular/router';
import { UserService } from '../Services/user.service';
import { RolePermissions } from '../Interfaces/RolePermission.interface';
import { GetUserPermissionService } from '../Services/get-user-permission.service';
import { MenuName } from '../Interfaces/Menu.interface';
@Component({
  selector: 'app-menu-method',
  templateUrl: './menu-method.component.html',
  styleUrls: ['./menu-method.component.css']
})
export class MenuMethodComponent implements OnInit {
  MenuArray: any = [];
  MenuNames: string;
  NewMenuName:string;
  MenuID: number;
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
      this.GetmenuList();
    }
  }

  GetmenuList(){
    this.Itemservice.GetMenuList().subscribe(
      (data: MenuName[]) => {
        this.MenuArray = data;
        console.log(this.MenuArray);

      },
      (error) => {
        console.error('Error fetching customer list:', error);
      }
    );
  }
  UpdateItemDetail(itemName: string, id: number) {
    this.MenuNames = itemName;
    this.MenuID = id;
  }

  DeleteMenu(MenuID: number) {
    this.Itemservice.DeleteMenu(MenuID).subscribe(() => {
      this.reloadInvoiceList();
    },
      (error) => {
        console.error('Error deleting invoice:', error);
      })

  };


  EditMenu() {
    const MenuName: MenuName = {
      ID: this.MenuID,
      Menu: this.MenuNames
    }
    this.Itemservice.EditMenu(MenuName).subscribe(() => {
      
    },
      (error) => {
        console.error('Error deleting invoice:', error);
      })
      
      this.reloadInvoiceList();
  };

  AddMenu(){
    const Menu: MenuName = {
      ID: 0,
      Menu: this.NewMenuName
    }
    this.Itemservice.AddMenu(Menu).subscribe(() => {
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
  
  this.Itemservice.GetMenuList().subscribe(
    (data: MenuName[]) => {
      this.MenuArray = data;
        
    },
    (error) => {
      console.error('Error fetching customer list:', error);
    }
  );

this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
  this.router.navigate(['/MenuMethod']);
});
}

, 200);


}
}
{

}
