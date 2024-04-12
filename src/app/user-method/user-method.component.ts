import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../Services/customer.service';
import { Item } from '../add-invoice/item.interface';
import { Customer } from '../Interfaces/Customer.interface';
import { ItemName } from '../Interfaces/ItemName.interface';
import { Router } from '@angular/router';
import { Role } from '../Interfaces/Role.interface';
import { User } from '../Interfaces/user.interface';
import { User2 } from '../Interfaces/User2.interface';
import { UserService } from '../Services/user.service';
import { GiveRole } from '../Interfaces/Giverole.interface';
import { RolePermissions } from '../Interfaces/RolePermission.interface';
import { GetUserPermissionService } from '../Services/get-user-permission.service';
@Component({
  selector: 'app-user-method',
  templateUrl: './user-method.component.html',
  styleUrls: ['./user-method.component.css']
})
export class UserMethodComponent implements OnInit {
  UserArray: any = [];
  RoleArray: any = [];
  UserNames: string;
  NewUserName: string;
  NewPassword: string;
  PassWord: string;
  UserID: number;
  UserIDforRole: number;
  RoleIDforRole: number;
  UserPermission:any;

  constructor(private Itemservice: CustomerService, private router: Router, private user: UserService,private Perm:GetUserPermissionService) { }

  ngOnInit() {

    this.GetPermission();

    

  }

  async GetPermission() {
    await this.Perm.GetUserPermission();
    this.UserPermission = this.Perm.UserPermission;
    console.log("object", this.UserPermission);
    
    if (this.UserPermission != null) {
      this.GetAllUserList();
    }
  }

  GetAllUserList(){
    this.Itemservice.GetAllUserList().subscribe(
      (data: User2[]) => {
        this.UserArray = data;
        console.log(this.UserArray);


      },
      (error) => {
        console.error('Error fetching customer list:', error);
      }
    );
    this.Itemservice.GetRoleList().subscribe(
      (data: Role[]) => {
        this.RoleArray = data;
        console.log(this.RoleArray);

      },
      (error) => {
        console.error('Error fetching customer list:', error);
      }
    );
  };


  UpdateItemDetail(UserName: string, id: number, PassWord: string) {
    this.UserNames = UserName;
    this.UserID = id;
    this.PassWord = PassWord;
  }

  DeleteUser(UserId: number) {
    this.Itemservice.DeleteUser(UserId).subscribe(() => {
      this.reloadInvoiceList();
    },
      (error) => {
        console.error('Error deleting invoice:', error);
      })

  };


  EditUser() {
    const User: User = {
      ID: this.UserID,
      UserName: this.UserNames,
      Password: this.PassWord,
      RoleID: 0,
    }
    this.Itemservice.EditUser(User).subscribe(() => {

    },
      (error) => {
        console.error('Error deleting invoice:', error);
      })

    this.reloadInvoiceList();
  };

  AddUser() {
    const User: User = {
      ID: 0,
      UserName: this.NewUserName,
      Password: this.NewPassword,
      RoleID: 0

    }
    this.Itemservice.AddUser(User).subscribe(() => {
    },
      (error) => {
        console.error('Error deleting invoice:', error);
      })
    this.reloadInvoiceList();

  }

  GiveRole(UserId:number,RoleID:number) {
    this.user.GetcurrentUser();
    console.log("USerID", this.user.Userdetails.UserID);
    const GiveRole: GiveRole = {
      RoleID:RoleID ,
      UserID: UserId,
    }
    this.Itemservice.GiveRole(GiveRole).subscribe(() => {
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

      this.Itemservice.GetAllUserList().subscribe(
        (data: User2[]) => {
          this.UserArray = data;

        },
        (error) => {
          console.error('Error fetching customer list:', error);
        }
      );

      this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
        this.router.navigate(['/UserMethod']);
      });
    }

      , 200);


  }

}

