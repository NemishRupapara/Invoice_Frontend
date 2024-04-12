import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { CombineInvoice } from '../add-invoice/CombineInvoice.interface';
import { Payment } from '../Interfaces/Payment.interface';
import { CustomerPayment } from '../Interfaces/CustomerPayment.interface';
import { InvoicePayment } from '../Interfaces/InvoicePayment.interface';
import { MultiplePaymentViewModel } from '../Interfaces/PaymentViewModel.interface';


@Injectable({
  providedIn: 'root'
})
export class AddInvoiceService {

  CheckSelect;

  remainingAmount;

  PaymentID;

  private apiUrl = 'https://localhost:7118/api';

  constructor(private http: HttpClient) { }

  addInvoice(newInvoice: CombineInvoice): Observable<any> {
    console.log(newInvoice, "Hiiii");
    return this.http.post<any>(`${this.apiUrl}/Invoice/AddInvoice`, newInvoice)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          console.error('Error:', error);

          // Rethrow the error to propagate it to the subscriber
          return throwError(error);
        })
      );
  }

  GetEditInvoiceDetail(InvoiceID: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/Invoice/${InvoiceID}`)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          console.error('Error:', error);

          // Rethrow the error to propagate it to the subscriber
          return throwError(error);
        })
      );
  }

  GetPaymentDetailForEdit(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/Invoice/GetPaymentDetailForEdit/${this.PaymentID}`)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          console.error('Error:', error);

          // Rethrow the error to propagate it to the subscriber
          return throwError(error);
        })
      );
  }
  GetInvoicePaymentList(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/Invoice/GetInvoicePaymentList/${this.PaymentID}`)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          console.error('Error:', error);

          // Rethrow the error to propagate it to the subscriber
          return throwError(error);
        })
      );
  }

  GetSinglePaymentDetail(InvoiceID: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/Invoice/GetSinglePaymentDetail/${InvoiceID}`)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          console.error('Error:', error);

          // Rethrow the error to propagate it to the subscriber
          return throwError(error);
        })
      );
  }

  EditInvoice(newInvoice: CombineInvoice): Observable<any> {
    console.log(newInvoice, "Hiiii");
    return this.http.post<any>(`${this.apiUrl}/Invoice/EditInvoice`, newInvoice)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          console.error('Error:', error);

          // Rethrow the error to propagate it to the subscriber
          return throwError(error);
        })
      );
  }

  GetInvoiceListOfCustomer(Customer: CustomerPayment): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/Invoice/GetInvoiceListOfCustomer`, Customer)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          console.error('Error:', error);

          // Rethrow the error to propagate it to the subscriber
          return throwError(error);
        })
      );
  }
  // EditSinglePayment(PaymentDetail: Payment): Observable<any> {
  //   // console.log(newInvoice,"Hiiii");
  //   return this.http.post<any>(`${this.apiUrl}/Invoice/EditSinglePayment`, PaymentDetail)
  //     .pipe(
  //       catchError((error: HttpErrorResponse) => {
  //         console.error('Error:', error);

  //         // Rethrow the error to propagate it to the subscriber
  //         return throwError(error);
  //       })
  //     );
  // }

  // EditSinglePayment(paymentDetail: Payment): Observable<string> {
  //   return this.http
  //     .post<any>(`${this.apiUrl}/Invoice/EditSinglePayment`, paymentDetail)
  //     .pipe(
  //       map((response: any) => {
  //         // Assuming the response is text, modify this according to the actual response format
  //         return response as string;
  //       }),
  //       catchError((error: HttpErrorResponse) => {
  //         console.error('Error:', error);
  //         // Rethrow the error to propagate it to the subscriber
  //         return throwError(error);
  //       })
  //     );
  // }

  EditSinglePayment(paymentDetail: Payment): Observable<string> {
    return this.http
      .post(`${this.apiUrl}/Invoice/EditSinglePayment`, paymentDetail, { responseType: 'text' })
      .pipe(
        catchError((error: HttpErrorResponse) => {
          if (error.error instanceof ErrorEvent) {
            // A client-side or network error occurred. Handle it accordingly.
            console.error('An error occurred:', error.error.message);
          } else {
            // The backend returned an unsuccessful response code.
            // The response body may contain clues as to what went wrong.
            console.error(
              `Backend returned code ${error.status}, ` +
              `body was: ${error.error}`
            );
          }
          return throwError('Something bad happened; please try again later.');
        })
      );
  }

  EditMultiplePayment(paymentDetail: MultiplePaymentViewModel): Observable<string> {
    return this.http
      .post(`${this.apiUrl}/Invoice/EditMultiplePayment`, paymentDetail, { responseType: 'text' })
      .pipe(
        catchError((error: HttpErrorResponse) => {
          if (error.error instanceof ErrorEvent) {
            // A client-side or network error occurred. Handle it accordingly.
            console.error('An error occurred:', error.error.message);
          } else {
            // The backend returned an unsuccessful response code.
            // The response body may contain clues as to what went wrong.
            console.error(
              `Backend returned code ${error.status}, ` +
              `body was: ${error.error}`
            );
          }
          return throwError('Something bad happened; please try again later.');
        })
      );
  }

  EditPayment(paymentDetail: MultiplePaymentViewModel): Observable<string> {
    return this.http
      .post(`${this.apiUrl}/Invoice/EditPayment`, paymentDetail, { responseType: 'text' })
      .pipe(
        catchError((error: HttpErrorResponse) => {
          if (error.error instanceof ErrorEvent) {
            // A client-side or network error occurred. Handle it accordingly.
            console.error('An error occurred:', error.error.message);
          } else {
            // The backend returned an unsuccessful response code.
            // The response body may contain clues as to what went wrong.
            console.error(
              `Backend returned code ${error.status}, ` +
              `body was: ${error.error}`
            );
          }
          return throwError('Something bad happened; please try again later.');
        })
      );
  }

  DeleteInvoice(InvoiceID: Number): Observable<any> {

    return this.http.delete<any>(`${this.apiUrl}/Invoice/DeleteInvoice/${InvoiceID}`)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          console.error('Error:', error);

          // Rethrow the error to propagate it to the subscriber
          return throwError(error);
        })
      );
  }

  DeletePAyment(PaymentID: Number): Observable<any> {

    return this.http.delete<any>(`${this.apiUrl}/Invoice/DeletePayment/${PaymentID}`)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          console.error('Error:', error);

          // Rethrow the error to propagate it to the subscriber
          return throwError(error);
        })
      );
  }
  GetAllPaymentDetailList(): Observable<any> {
    const USerId = parseInt(localStorage.getItem("UserID"), 10);

    return this.http.get<any>(`${this.apiUrl}/Invoice/GetAllPaymentDetailList/${USerId}`)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          console.error('Error:', error);

          // Rethrow the error to propagate it to the subscriber
          return throwError(error);
        })
      );
  }

}
