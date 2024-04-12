import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { UserService } from './user.service';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DisplayInvoiceListService {
  private apiUrl = 'https://localhost:7118/api';

  constructor(private http: HttpClient,private User:UserService) { }

  GetInvoiceList(): Observable<any> {
    // this.User.GetcurrentUser();
  //   let token = this.User.GetToken(); // Retrieve the JWT token
  //   console.log(token);
  // const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
  // console.log(`${this.apiUrl}/Invoice/GetInvoiceList/${this.User.Userdetails.UserID}`, { headers });
  //return this.http.get<any>(`${this.apiUrl}/Invoice/GetInvoiceList/${localStorage.getItem("UserID")}`,{headers})
const USerId=parseInt(localStorage.getItem("UserID"), 10);

if(USerId==1){
  return this.http.get<any>(`${this.apiUrl}/Invoice/GetAllInvoiceList`)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          console.error('Error:', error);

          // Rethrow the error to propagate it to the subscriber
          return throwError(error);
        })
      );

      }
      else{
        return this.http.get<any>(`${this.apiUrl}/Invoice/GetInvoiceList/${USerId}`)
        .pipe(
          catchError((error: HttpErrorResponse) => {
            console.error('Error:', error);
  
            // Rethrow the error to propagate it to the subscriber
            return throwError(error);
          })
        );
  
      }
  }
}
