import { Component, OnInit } from '@angular/core';
import { Role } from '../Interfaces/Role.interface';
import { Router } from '@angular/router';
import { CustomerService } from '../Services/customer.service';
import { RolePermissions } from '../Interfaces/RolePermission.interface';
import { UserService } from '../Services/user.service';
import { GetUserPermissionService } from '../Services/get-user-permission.service';

@Component({
  selector: 'app-role-acces',
  templateUrl: './role-acces.component.html',
  styleUrls: ['./role-acces.component.css']
})
export class RoleAccesComponent  implements OnInit{
  RoleArray: any = [];
  PermissionArray:any=[];
  Rolepermission:RolePermissions[];
  selectedRole:number;
  S2:number=this.RoleService.SelectedRole;

  constructor(private RoleService: CustomerService,private router:Router,private _userService:UserService,private UserPermission:GetUserPermissionService) { }
  ngOnInit() {
     this.RoleService.GetRoleList().subscribe(
    (data: Role[]) => {
      this.RoleArray = data;
      console.log(this.RoleArray);

    },
    (error) => {
      console.error('Error fetching customer list:', error);
    }
  );
  // if(this.selectedRole!=0){this.getPermissionsForSelectedRole()}
  this.RoleService.GetRolePermissions(this.RoleService.SelectedRole).subscribe(
    (data: RolePermissions[]) => {
      this.PermissionArray = data;
      console.log(this.PermissionArray);

    },
    (error) => {
      console.error('Error fetching customer list:', error);
    }
  );

}

  getPermissionsForSelectedRole(){
    this.RoleService.SelectedRole=this.S2;
    this.RoleService.GetRolePermissions(this.RoleService.SelectedRole).subscribe(
      (data: RolePermissions[]) => {
        this.PermissionArray = data;
        console.log(this.PermissionArray);
  
      },
      (error) => {
        console.error('Error fetching customer list:', error);
      }
    );

  }
  isAllSelected(permission: any): boolean {
    return permission.add && permission.edit && permission.delete && permission.view;
}

selectAll(event: any, permission: any): void {
  const isChecked = event.target.checked;
  permission.add = isChecked;
  permission.edit = isChecked;
  permission.delete = isChecked;
  permission.view = isChecked;
}
savePermissions() {
  this.Rolepermission = this.PermissionArray.map((item: any) => ({
    ID: item.id,
    Menu: item.menu,
    Add:item.add? 1 : 0,
    Edit:item.edit? 1 : 0,
    Delete:item.delete? 1 : 0,
    View:item.view? 1 : 0,
    RoleID:item.roleID

  }));

  this.RoleService.EditPermissions(this.Rolepermission).subscribe(() => {
      
  },
    (error) => {
      console.error('Error deleting invoice:', error);
    })
    
    this.ReloadPermissions();
  console.log("Sampleeee",this.Rolepermission);
  console.log(true);
}

ReloadPermissions(){
  setTimeout(() => {
    this.RoleService.GetRolePermissions(this.selectedRole).subscribe(
      (data: RolePermissions[]) => {
        this.PermissionArray = data;
        setTimeout(() => {
          // this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
            this._userService.setReferesGalleryGrid(true);
            // this.router.navigate(['/RolePermission']);
             
        //     this.UserPermission.GetUserPermission();
        //   });
         }, 200);
        console.log(this.PermissionArray);
  
      },
      (error) => {
        console.error('Error fetching customer list:', error);
      }
    );
  }, 250);
  
}


  }

