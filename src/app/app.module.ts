import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddInvoiceComponent } from './add-invoice/add-invoice.component';
import { FormsModule } from '@angular/forms';
import{HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { DisplayListComponent } from './display-list/display-list.component';
import { EdittInvoiceComponent } from './editt-invoice/editt-invoice.component';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
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
import { AuthInterceptorServiceTsService } from './Services/auth-interceptor.service.ts.service';
import { AgGridComponent } from './ag-grid/ag-grid.component';
import { AgGridAngular } from "@ag-grid-community/angular";
import { ClientSideRowModelModule } from "@ag-grid-community/client-side-row-model";
import { ChatComponent } from './chat/chat.component';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { environment } from './environment/environment';
@NgModule({
  declarations: [
    AppComponent,
    AddInvoiceComponent,
    DisplayListComponent,
    EdittInvoiceComponent,
    SignupComponent,
    LoginComponent,
    ItemMethodComponent,
    CustometMethodComponent,
    RoleMethodComponent,
    UserMethodComponent,
    RoleAccesComponent,
    NavbarComponent,
    PaymentComponent,
    PaymentDetailComponent,
    PaymentModeComponent,
    MenuMethodComponent,
    PaymentHistoryComponent,
    EditPaymentComponent,
    AgGridComponent,
    ChatComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    AgGridAngular,
    AngularFireModule.initializeApp(environment.firebaseConfig), // Initialize Firebase
    AngularFireDatabaseModule // Firebas
    
  ],
  providers: [{provide:HTTP_INTERCEPTORS,useClass:AuthInterceptorServiceTsService,multi:true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
