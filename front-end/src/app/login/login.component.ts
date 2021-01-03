import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from "../services/api.service";
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms'
import { User } from '../models/User';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {
  userLoginForm: FormGroup;
  user: User;
  password: string = '';
  email: string = '';
  message: string = '';

  constructor(private router: Router,
    private apiService: ApiService,
    private fb: FormBuilder) {
    this.initializeForm()
  }

  ngOnInit(): void {
  }

  initializeForm() {
    this.userLoginForm = this.fb.group({
      email: ['', [Validators.required,
      Validators.pattern(/^[-_a-zA-Z0-9]*/)
      ]]
      ,
      password: ['', [Validators.required,
      Validators.pattern(/^[-_a-zA-Z0-9]*/)
      ]]
    })
  }

  // Get back to this
  uniqueEmailValidator(control: AbstractControl): { [key: string]: boolean } | null {
    if (control.value !== this.user.email) {
      return { 'uniqueEmail': true }
    }
    return null
  }

  uniquePasswordValidator(control: AbstractControl): { [key: string]: boolean } | null {
    if (control.value !== this.password) {
      return { 'uniqueEmail': true }
    }
    return null
  }

  alertPasswordSuccess() {
    this.message = 'Successful login! Navigating to homepage!'
    setTimeout(() => {
      this.router.navigateByUrl('/')
    }, 5000)
  }

  alertPasswordFail() {
    this.message = 'Wrong password!'
  }

  onSubmit() {
    this.user = this.userLoginForm.value;
    let user_id = null;

    this.apiService.getUser(this.user.email)
      .subscribe(
        (data: any) => {
          user_id = data.id
          this.password = data.password
          // password OK, proceed
          this.user.password == this.password
            ? this.alertPasswordSuccess()
            : this.alertPasswordFail()
          // save to cookies
          localStorage.setItem('user_id', '');
          localStorage.setItem('user_id', user_id);
        }, (error) => {
          console.log(error)
        }
      )
  }

}
