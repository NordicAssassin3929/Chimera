import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {ApiService} from "../services/api.service";
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
  user_id: String = null;
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
    console.log(this.user)

    this.apiService.getUser(this.user.email)
    .subscribe(
      (data: any) => {
        console.log(data);
      }, (error) => {
        console.log(error)
      }
    )
  }

}
