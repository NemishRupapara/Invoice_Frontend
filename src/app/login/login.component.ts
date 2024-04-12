import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Login } from '../Interfaces/Login.interface';
import { UserService } from '../Services/user.service';
import { GetUserPermissionService } from '../Services/get-user-permission.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  signupForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private login: UserService,
    private GetUserPermission: GetUserPermissionService
  ) {}

  ngOnInit(): void {
    this.signupForm = this.formBuilder.group({
      UserName: ['', Validators.required],
      Password: ['', Validators.required],
    });
  }

  onSubmit(): void {
    if (this.signupForm.valid) {
      console.log('Form submitted:', this.signupForm.value);

      const dataToSend: Login = {
        ID: 0,
        UserName: this.signupForm.value.UserName,
        Password: this.signupForm.value.Password,
      };

      this.login.LoginUser(dataToSend).subscribe(
        (response) => {
          console.log('API response:', response);
          this.login.SetToken(response);
          //  this.router.navigateByUrl('/VerifyUser');
          this.Reloadds();
        },
        (error) => {
          console.error('API error:', error);
        }
      );
    }
  }

  Reloadds() {
    setTimeout(() => {
      this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
        this.login.setReferesGalleryGrid(true);
        this.router.navigate(['/DisplayInvoiceList']);

        this.GetUserPermission.GetUserPermission();
      });
    }, 200);
  }

  GotoSignUp(): void {
    this.router.navigateByUrl('/SignUp');
  }
}
{
}
