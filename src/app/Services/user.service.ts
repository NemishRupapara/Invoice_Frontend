import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { map,catchError } from 'rxjs/operators';
import { User } from '../Interfaces/user.interface';
import { Login } from '../Interfaces/Login.interface';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';
import { GetUserPermissionService } from './get-user-permission.service';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'https://localhost:7118/api';
  jwtHelperservice=new JwtHelperService();

Userdetails:any;
  constructor(private http: HttpClient,private router:Router) { }
  
  private referesGalleryGridData = new BehaviorSubject(false);
  referesGalleryGrid = this.referesGalleryGridData.asObservable();

  setReferesGalleryGrid(openModel: boolean) {
    this.referesGalleryGridData.next(openModel);
  }

  private referesGalleryGridDatas = new BehaviorSubject(false);
  referesGalleryGrids = this.referesGalleryGridData.asObservable();

  setReferesGalleryGrids(openModel: boolean) {
    this.referesGalleryGridDatas.next(openModel);
  }
  
  AddNewUser(NewUser: User): Observable<any> {
    // console.log("NewUser");
    // console.log(NewUser);

    return this.http.post<any>(`${this.apiUrl}/Account/AddNewUser`, NewUser)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          console.error('Error:', error);

          return throwError(error);
        })
      );
  }


  LoginUser(User: Login): Observable<any> {
    console.log("NewUser");
    console.log(User);
  
    return this.http.post(`${this.apiUrl}/Account/LoginCheck`, User, { responseType: 'text' })
      .pipe(
        map(response => {
          if (response === 'Invalid UserName Or Password') {
            return response; 
          } else {
            return response; 
          }
        }),
        catchError((error: HttpErrorResponse) => {
          console.error('Error:', error);
          return throwError(error);
        })
      );

}

GetUserPermission(RoleID:number): Observable<any> {
  return this.http.get<any>(`${this.apiUrl}/Invoice/GetUserPermission/${RoleID}`)
    .pipe(
      catchError((error: HttpErrorResponse) => {
        console.error('Error:', error);

        // Rethrow the error to propagate it to the subscriber
        return throwError(error);
      })
    );
}


SetToken(token:string){
  localStorage.setItem("access_token",token);
  this.GetcurrentUser();
}

GetToken(){
  return localStorage.getItem("access_token");
}


GetcurrentUser(){
  const token=localStorage.getItem("access_token");
  // const UserInfo=token!=null?this.jwtHelperservice.decodeToken(token):null;
  // console.log(token!=null?this.jwtHelperservice.decodeToken(token):null);
  this.Userdetails=token!=null?this.jwtHelperservice.decodeToken(token):null;
  localStorage.setItem("UserID",this.Userdetails.UserID)
  localStorage.setItem("RoleID",this.Userdetails.RoleID)

  console.log("Helooooo",this.Userdetails);
  // console.log(this.Userdetails.UseName);
  // console.log(UserInfo.UseName);
}

IsLoggedIn():boolean{
  return localStorage.getItem("access_token")?true:false;
}

RemoveToken(){
  localStorage.removeItem("access_token");
  localStorage.removeItem("UserID");
  localStorage.removeItem("RoleID");
}
getcurrentuserdetails(){
  const token=localStorage.getItem("access_token");
  // const UserInfo=token!=null?this.jwtHelperservice.decodeToken(token):null;
  // console.log(token!=null?this.jwtHelperservice.decodeToken(token):null);
  this.Userdetails=token!=null?this.jwtHelperservice.decodeToken(token):null;
  return this.Userdetails;
}
Logout(){
  this.RemoveToken();
  this.setReferesGalleryGrid(true);
  // this.GetUserPermissionService1.UserPermission=[];
  setTimeout(() => {
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate(['/']);
      window.location.reload();
    });
  }, 200);
}
}
