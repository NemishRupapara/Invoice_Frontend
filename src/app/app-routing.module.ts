import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddInvoiceComponent } from './add-invoice/add-invoice.component';
import { DisplayListComponent } from './display-list/display-list.component';
import { EdittInvoiceComponent } from './editt-invoice/editt-invoice.component';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { authGuard } from './Services/auth.guard';
import { ItemMethodComponent } from './item-method/item-method.component';
import { CustometMethodComponent } from './customet-method/customet-method.component';
import { RoleMethodComponent } from './role-method/role-method.component';
import { UserMethodComponent } from './user-method/user-method.component';
import { RoleAccesComponent } from './role-acces/role-acces.component';
import { NavbarComponent } from './navbar/navbar.component';
import { PaymentComponent } from './payment/payment.component';
import { PaymentDetailComponent } from './payment-detail/payment-detail.component';
import { PaymentModeComponent } from './payment-mode/payment-mode.component';
import { MenuMethodComponent } from './menu-method/menu-method.component';
import { PaymentHistoryComponent } from './payment-history/payment-history.component';
import { EditPaymentComponent } from './edit-payment/edit-payment.component';
import { AgGridComponent } from './ag-grid/ag-grid.component';
import { ChatComponent } from './chat/chat.component';

const routes: Routes = [
{path:'DisplayInvoiceList',component:DisplayListComponent,canActivate:[authGuard]},
{path:'EditInvoice/:InvoiceId',component:EdittInvoiceComponent,canActivate:[authGuard]},
{path:'SignUp',component:SignupComponent},
{path:'Login',component:LoginComponent},
{path:'ItemMethod',component:ItemMethodComponent,canActivate:[authGuard]},
{path:'CustomerMethod',component:CustometMethodComponent,canActivate:[authGuard]},
{path:'AddInvoice',component:AddInvoiceComponent,canActivate:[authGuard]},
{path:'RoleMethod',component:RoleMethodComponent,canActivate:[authGuard]},
{path:'MenuMethod',component:MenuMethodComponent,canActivate:[authGuard]},
{path:'PaymentHistory',component:PaymentHistoryComponent,canActivate:[authGuard]},
{path:'EditPayment',component:EditPaymentComponent,canActivate:[authGuard]},



{path:'PaymentModeMethod',component:PaymentModeComponent,canActivate:[authGuard]},

{path:'UserMethod',component:UserMethodComponent,canActivate:[authGuard]},
{path:'RolePermission',component:RoleAccesComponent,canActivate:[authGuard]},
{path:'Payment',component:PaymentDetailComponent,canActivate:[authGuard]},

{path:'Payment/:InvoiceId',component:PaymentComponent,canActivate:[authGuard]},

 {path:'VerifyUser',component:NavbarComponent,canActivate:[authGuard]},
 {path:'ag-grid',component:AgGridComponent},
 {path:'chat',component:ChatComponent},

    
 {path:'',redirectTo:"Login",pathMatch:"full"},






];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
