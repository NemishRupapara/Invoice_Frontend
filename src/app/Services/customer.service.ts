import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Customer } from '../Interfaces/Customer.interface';
import { ItemName } from '../Interfaces/ItemName.interface';
import { Role } from '../Interfaces/Role.interface';
import { User } from '../Interfaces/user.interface';
import { User2 } from '../Interfaces/User2.interface';
import { GiveRole } from '../Interfaces/Giverole.interface';
import { RolePermissions } from '../Interfaces/RolePermission.interface';
import { PaymentMode } from '../Interfaces/paymentmode.interface';
import { MenuName } from '../Interfaces/Menu.interface';
import { UserService } from './user.service';
@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  private apiUrl = 'https://localhost:7118/api';

  constructor(private http: HttpClient,private User: UserService
    ) { }


SelectedRole:number;

  GetCustomerList(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/Invoice/GetcustomerList`)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          console.error('Error:', error);

          // Rethrow the error to propagate it to the subscriber
          return throwError(error);
        })
      );
  }

  GetItemList(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/Invoice/GetItemList`)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          console.error('Error:', error);

          // Rethrow the error to propagate it to the subscriber
          return throwError(error);
        })
      );
  }
  GetMenuList(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/Invoice/GetMenuList`)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          console.error('Error:', error);

          // Rethrow the error to propagate it to the subscriber
          return throwError(error);
        })
      );
  }
  GetRoleList(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/Invoice/GetRoleList`)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          console.error('Error:', error);

          // Rethrow the error to propagate it to the subscriber
          return throwError(error);
        })
      );
  }
  GetSampleList(): Observable<any> {
    return this.http.get<any>(`http://localhost:8080/api/getPendingWithdrawalRequest/wallet101112`)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          console.error('Error:', error);

          // Rethrow the error to propagate it to the subscriber
          return throwError(error);
        })
      );
  }
  GetPAymentModeList(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/Invoice/GetPaymentModeList`)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          console.error('Error:', error);

          // Rethrow the error to propagate it to the subscriber
          return throwError(error);
        })
      );
  }
  GetPAymentModeList2(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/Invoice/GetPaymentModeList2`)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          console.error('Error:', error);

          // Rethrow the error to propagate it to the subscriber
          return throwError(error);
        })
      );
  }
  GetAllUserList(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/Invoice/GetAllUserList`)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          console.error('Error:', error);

          // Rethrow the error to propagate it to the subscriber
          return throwError(error);
        })
      );
  }

  GetRolePermissions(RoleID:number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/Invoice/GetRolePermissions/${RoleID}`)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          console.error('Error:', error);

          // Rethrow the error to propagate it to the subscriber
          return throwError(error);
        })
      );
  }


  EditItem(Item:ItemName): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/Navbar/EditItemName`,Item)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          console.error('Error:', error);

          // Rethrow the error to propagate it to the subscriber
          return throwError(error);
        })
      );
  }
  EditCustomer(Customer:Customer): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/Navbar/EditCustomerName`,Customer)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          console.error('Error:', error);

          // Rethrow the error to propagate it to the subscriber
          return throwError(error);
        })
      );
  } 

  EditMenu(Menu:MenuName): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/Navbar/EditMenu`,Menu)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          console.error('Error:', error);

          // Rethrow the error to propagate it to the subscriber
          return throwError(error);
        })
      );
  } 
  EditRole(Role:Role): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/Navbar/EditRole`,Role)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          console.error('Error:', error);

          // Rethrow the error to propagate it to the subscriber
          return throwError(error);
        })
      );
  }
  EditPaymentMode(PaymentMode:PaymentMode): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/Navbar/EditPaymentMode`,PaymentMode)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          console.error('Error:', error);

          // Rethrow the error to propagate it to the subscriber
          return throwError(error);
        })
      );
  }
  EditUser(User:User): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/Navbar/EditUser`,User)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          console.error('Error:', error);

          // Rethrow the error to propagate it to the subscriber
          return throwError(error);
        })
      );
  }

  EditPermissions(RolePermissions:RolePermissions[]): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/Navbar/EditPermissions`,RolePermissions)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          console.error('Error:', error);

          // Rethrow the error to propagate it to the subscriber
          return throwError(error);
        })
      );
  }
  GiveRole(GiveRole:GiveRole): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/Navbar/GiveRole`,GiveRole)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          console.error('Error:', error);

          // Rethrow the error to propagate it to the subscriber
          return throwError(error);
        })
      );
  }

  DeleteItem(ItemID:number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/Navbar/DeleteItemName/${ItemID}`)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          console.error('Error:', error);

          // Rethrow the error to propagate it to the subscriber
          return throwError(error);
        })
      );
  }


   //
  // Retrieve the JWT token
  //   console.log(token);
  // const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
  // console.log(`${this.apiUrl}/Invoice/GetInvoiceList/${this.User.Userdetails.UserID}`, { headers });
  //return this.http.get<any>(`${this.apiUrl}/Invoice/GetInvoiceList/${localStorage.getItem("UserID")}`,{headers})
  DeleteCustomer(CustID:number): Observable<any> {
    this.User.GetcurrentUser();
    let token = this.User.GetToken(); 
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.delete<any>(`${this.apiUrl}/Navbar/DeleteCustomerName/${CustID}`)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          console.error('Error:', error);

          // Rethrow the error to propagate it to the subscriber
          return throwError(error);
        })
      );
  } 
   DeleteRole(RoleID:number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/Navbar/DeleteRole/${RoleID}`)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          console.error('Error:', error);

          // Rethrow the error to propagate it to the subscriber
          return throwError(error);
        })
      );
  }
  DeleteMenu(MenuID:number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/Navbar/DeleteMenu/${MenuID}`)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          console.error('Error:', error);

          // Rethrow the error to propagate it to the subscriber
          return throwError(error);
        })
      );
  }
  DeletePAymentMode(PaymentModeID:number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/Navbar/DeletePaymentMode/${PaymentModeID}`)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          console.error('Error:', error);

          // Rethrow the error to propagate it to the subscriber
          return throwError(error);
        })
      );
  }
  DeleteUser(UserID:number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/Navbar/DeleteUser/${UserID}`)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          console.error('Error:', error);

          // Rethrow the error to propagate it to the subscriber
          return throwError(error);
        })
      );
  }

  AddItem(Item:ItemName): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/Navbar/AddItemName`,Item)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          console.error('Error:', error);

          // Rethrow the error to propagate it to the subscriber
          return throwError(error);
        })
      );
  }

  AddCustomer(Customer:Customer): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/Navbar/AddCustomer`,Customer)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          console.error('Error:', error);

          // Rethrow the error to propagate it to the subscriber
          return throwError(error);
        })
      );
  }

  AddMenu(Menu:MenuName): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/Navbar/AddMenu`,Menu)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          console.error('Error:', error);

          // Rethrow the error to propagate it to the subscriber
          return throwError(error);
        })
      );
  }
  AddRole(Role:Role): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/Navbar/AddRole`,Role)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          console.error('Error:', error);

          // Rethrow the error to propagate it to the subscriber
          return throwError(error);
        })
      );
  }
  AddPaymentMode(PaymentMode:PaymentMode): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/Navbar/AddPaymentMode`,PaymentMode)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          console.error('Error:', error);

          // Rethrow the error to propagate it to the subscriber
          return throwError(error);
        })
      );
  }


  
  AddUser(User:User): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/Navbar/AddUser`,User)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          console.error('Error:', error);

          // Rethrow the error to propagate it to the subscriber
          return throwError(error);
        })
      );
  }


}
