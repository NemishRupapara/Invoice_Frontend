import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../Services/user.service';
import { User } from '../Interfaces/user.interface';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  signupForm!: FormGroup;
  NewUser: User = {
    ID: 0,
    UserName: "",
    Password: "",
    RoleID: 3,
  }
  constructor(private formBuilder: FormBuilder, private router: Router, private user: UserService) { }

  ngOnInit(): void {
    this.signupForm = this.formBuilder.group({
      UserName: ['', Validators.required],
      Password: ['', Validators.required]
    });
  }

  onSubmit(): void {
    // console.log(this.signupForm.value.UserName);
    if (this.signupForm.valid) {
      const dataToSend: User = {
        ID: 0,
        UserName: this.signupForm.value.UserName,
        Password:this.signupForm.value.Password,
        RoleID:3
      };

      this.user.AddNewUser(dataToSend).subscribe(
        response => {
          console.log('API response:', response);
        },
        error => {
          console.error('API error:', error);
        }
      );
  
      this.router.navigateByUrl('/Login');


    }
  }

  goToLogin(): void {
    this.router.navigateByUrl('/Login');
  }
} 