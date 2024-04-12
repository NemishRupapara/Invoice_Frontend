import { ChangeDetectorRef, Component, OnInit, SimpleChanges } from '@angular/core';
import { UserService } from '../Services/user.service';
import { Router, NavigationEnd } from '@angular/router';
import { RolePermissions } from '../Interfaces/RolePermission.interface';
import { GetUserPermissionService } from '../Services/get-user-permission.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  UserPermission: any = [];
  Observblesubscribe: any;
  count: any;
  itemmenu:any
  galleryGrid:Subscription
  RoleID:number;
  constructor(private _userService: UserService, private router: Router, private GetUserPermission: GetUserPermissionService,private _ref:ChangeDetectorRef) { }
  IsLoggedIn:boolean=this._userService.IsLoggedIn();
  ngOnInit(): void {
    this._ref.detectChanges();
    this.RoleID= parseInt(localStorage.getItem("RoleID"), 10);
    this.IsLoggedIn=this._userService.IsLoggedIn();


    // this.updateNavbarOnRouteChange(); 
    this.galleryGrid = this._userService.referesGalleryGrid.subscribe(
      (res: any) => {
        if (res) {
          this.GetPermission();
          this.RoleID= parseInt(localStorage.getItem("RoleID"), 10);
          this.IsLoggedIn=this._userService.IsLoggedIn();


        }
      }
    );
    this.GetPermission();
    this._ref.detectChanges();

    // this.Observblesubscribe = this.GetUserPermission.CustObservable().subscribe((data) => {
    //   console.log("GGGGGG",data);
    // }, (error) => {
    //   console.error(error);
    // })
    // this.ViewPermission();
  }
 
  ngOnDestroy() {
    this.galleryGrid.unsubscribe();
  }


  async GetPermission() {
    await this.GetUserPermission.GetUserPermission();
    this.UserPermission = this.GetUserPermission.UserPermission;
    console.log("object", this.UserPermission);
    this._ref.detectChanges();
    if(this.itemmenu == 'User'){
      this.GetPermission()
    }
  
  }
  Logout() {
    this._userService.Logout();
    this.UserPermission = []
    this.IsLoggedIn=false;

  }
  // updateNavbarOnRouteChange() {
  //   this.router.events.subscribe((event) => {
  //     if (event instanceof NavigationEnd) {
  //       // Update navbar when route changes
  //       this.ViewPermission();
  //     }
  //   });
  // }


  // ViewPermission() {
  //   const RoleID = parseInt(localStorage.getItem("RoleID"), 10);
  //   if (RoleID) {
  //     this.UserService.GetUserPermission(RoleID).subscribe(
  //       (data: RolePermissions) => {
  //         this.UserPermission = data;
  //         setTimeout(() => {
  //           this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
  //             this.router.navigate(['/DisplayInvoiceList']);
  //           });
  //         }, 200);

  //         console.log(this.UserPermission);

  //       },
  //       (error) => {
  //         console.error('Error fetching customer list:', error);
  //       }
  //     );
  //   }


  // }
}
