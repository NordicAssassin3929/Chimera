import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from "../services/api.service";
import { FormGroup, FormBuilder } from '@angular/forms'
import { User } from '../models/User';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {
  contactForm: FormGroup;
  userLoginForm: FormGroup;
  user: User;

  constructor(private router: Router,
    private apiService: ApiService,
    private fb: FormBuilder) { }

  ngOnInit(): void {
    this.initializeForm()
  }

  initializeForm() {
    this.userLoginForm = this.fb.group({
      email: '',
      password: ''
    })
  }

  onSubmit() {
    this.user = this.userLoginForm.value;
    let user_id = null;
    let password = null;

    this.apiService.getUser(this.user.email)
      .subscribe(
        (data: any) => {
          user_id = data.id
          password = data.password
          // password OK, proceed
          this.user.password == password
            ? this.router.navigateByUrl('/')
            : console.log('password no good!')
          // save to cookies
          localStorage.setItem('user_id', '');
          localStorage.setItem('user_id', user_id);
        }, (error) => {
          console.log(error)
        }
      )
  }

}
