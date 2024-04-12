import { Injectable,OnInit } from '@angular/core';
import { UserService } from '../Services/user.service';
import { Router,NavigationEnd } from '@angular/router';
import { RolePermissions } from '../Interfaces/RolePermission.interface';

@Injectable({
  providedIn: 'root'
})
export class NavbarUpdateService {

  UserPermission: any;

  constructor(private UserService:UserService,private router:Router){}
  ViewPermission(){
    const RoleID = parseInt(localStorage.getItem("RoleID"), 10);
    if(RoleID){
      this.UserService.GetUserPermission(RoleID).subscribe(
        (data: RolePermissions) => {
          this.UserPermission = data;
         
          console.log(this.UserPermission);
  
        },
        (error) => {
          console.error('Error fetching customer list:', error);
        }
      );
    }
    
    return this.UserPermission;
  }
}
