import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpHeaders,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { UserService } from './user.service';
import { GetUserPermissionService } from './get-user-permission.service';

@Injectable({
  providedIn: 'root',
})
export class AuthInterceptorServiceTsService implements HttpInterceptor {
  constructor(
    private user: UserService,
    private UserPermission: GetUserPermissionService
  ) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const token = this.user.GetToken();

    if (token) {
      const authReq = req.clone({
        headers: req.headers.set('Authorization', `Bearer ${token}`),
      });

      return next.handle(authReq).pipe(
        catchError((error: any) => {
          if (error instanceof HttpErrorResponse && error.status === 401) {
            this.UserPermission.UserPermission = [];
            this.user.Logout();
          }
          return throwError(error);
        })
      );
    }

    return next.handle(req);
  }
}
