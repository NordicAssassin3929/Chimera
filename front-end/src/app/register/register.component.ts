import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../models/User';
import {ApiService} from "../services/api.service";
import { FormGroup, FormBuilder } from '@angular/forms'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.sass']
})
export class RegisterComponent implements OnInit {
  contactForm: FormGroup;
  userRegistrationForm: FormGroup;
  user: User;

  constructor(private apiService: ApiService,
    private router: Router,
    private fb: FormBuilder) { 
    }

  ngOnInit(): void {
    this.initializeForm()
  }

  initializeForm() {
    this.userRegistrationForm = this.fb.group({
      email: '',
      password: '',
      dob: ''
    }) 
  }

  onSubmit() {
    this.user = this.userRegistrationForm.value;
    console.log(this.user)

    this.apiService.createUser(this.user)
    .subscribe(
      (data: User) => {
        console.log(data);
      }, (error) => {
        console.log(error)
      }
    )
  }

}
