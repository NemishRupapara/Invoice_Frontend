import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../Services/customer.service';
import { Item } from '../add-invoice/item.interface';
import { Customer } from '../Interfaces/Customer.interface';
import { ItemName } from '../Interfaces/ItemName.interface';
import { Router } from '@angular/router';
import { Role } from '../Interfaces/Role.interface';
import { UserService } from '../Services/user.service';

import { RolePermissions } from '../Interfaces/RolePermission.interface';
import { GetUserPermissionService } from '../Services/get-user-permission.service';

@Component({
  selector: 'app-role-method',
  templateUrl: './role-method.component.html',
  styleUrls: ['./role-method.component.css']
})
export class RoleMethodComponent  implements OnInit{
  RoleArray: any = [];
  RoleNames: string;
  NewRoleName:string;
  RoleID: number;
  UserPermission: any;

  constructor(private Itemservice: CustomerService,private router:Router, private Userservice: UserService,private Perm:GetUserPermissionService ) { }

  ngOnInit() {

    this.GetPermission();
    this.GetSampleList();

  }


  async GetPermission() {
    await this.Perm.GetUserPermission();
    this.UserPermission = this.Perm.UserPermission;
    console.log("object", this.UserPermission);
    
    if (this.UserPermission != null) {
      this.GetROleList();
    }
  }

  GetROleList(){
    this.Itemservice.GetRoleList().subscribe(
      (data: Role[]) => {
        this.RoleArray = data;
        console.log(this.RoleArray);

      },
      (error) => {
        console.error('Error fetching customer list:', error);
      }
    );
  }

  GetSampleList(){
    this.Itemservice.GetSampleList().subscribe(
      (data: any) => {
       
        console.log(data);

      },
      (error) => {
        console.error('Error fetching customer list:', error);
      }
    );
  }

  UpdateItemDetail(RoleName: string, id: number) {
    this.RoleNames = RoleName;
    this.RoleID = id;
  }

  DeleteRole(RoleID: number) {
    this.Itemservice.DeleteRole(RoleID).subscribe(() => {
      this.reloadInvoiceList();
    },
      (error) => {
        console.error('Error deleting invoice:', error);
      })

  };


  EditRole() {
    const Role: Role = {
      ID: this.RoleID,
      Role: this.RoleNames
    }
    this.Itemservice.EditRole(Role).subscribe(() => {
      
    },
      (error) => {
        console.error('Error deleting invoice:', error);
      })
      
      this.reloadInvoiceList();
  };

  AddRole(){
    const Role: Role = {
      ID: 0,
      Role: this.NewRoleName
    }
    this.Itemservice.AddRole(Role).subscribe(() => {
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
  
  this.Itemservice.GetRoleList().subscribe(
    (data: Role[]) => {
      this.RoleArray = data;
        
    },
    (error) => {
      console.error('Error fetching customer list:', error);
    }
  );

this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
  this.router.navigate(['/RoleMethod']);
});
}

, 200);


}

}
