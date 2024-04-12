import { Injectable } from '@angular/core';
import { RolePermissions } from '../Interfaces/RolePermission.interface';
import { UserService } from '../Services/user.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GetUserPermissionService {
  UserPermission: any;

  constructor(private Userservice: UserService) {}

  async GetUserPermission(): Promise<any> {
    return new Promise((resolve, reject) => {
      const RoleID = parseInt(localStorage.getItem("RoleID"), 10);
      this.Userservice.GetUserPermission(RoleID).subscribe(
        (data: RolePermissions) => {
          this.UserPermission = data;
          console.log(this.UserPermission);
          resolve(this.UserPermission); // Resolve with fetched data
        },
        (error) => {
          console.error('Error fetching customer list:', error);
          reject(error); // Reject with the error
        }
      );
    });
  }

  CustObservable(): Observable<any> {
    this.GetUserPermission();
    return new Observable<any>(observer => {
      observer.next(this.UserPermission);

      const interval = setInterval(() => {
        if (this.UserPermission!=null) {
          // observer.error('Count reached 5');
          observer.complete();
          clearInterval(interval); // Stop the interval when count reaches 5 or more
        }
      }, 1000);
  
      // Return teardown logic for cleanup when unsubscribed
      return () => {
        clearInterval(interval); // Clear the interval when unsubscribed
      };
    });
}
}