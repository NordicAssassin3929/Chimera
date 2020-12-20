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
    let email = null;
    let userExists = null
    // check if username is taken already
    this.apiService.checkIfUserExists(this.user.email)
      .subscribe(
        async (data: any) => {
          userExists = await data
          console.log('AM I HERE ' + data)
        }
      )

    console.log('userExists: ' + userExists)
    if (userExists) {
    console.log('If')
    this.apiService.getUser(this.user.email)
    .subscribe(
      async (data: any) => {
        email = await data.email
        console.log('email: ' + email)
        console.log('this.user.email: ' + this.user.email)
        if(this.user.email !== email && email !== undefined) {
          //this.createUser()
        }
        else{
          console.log('username is taken!')
        }
      }, (error) => {
        console.log(error)
      }
    )
    }
    // user doesn't exist
    else {
      console.log('Else')
      //this.createUser()
    }
  }

  createUser() {
    this.user = this.userRegistrationForm.value;
      this.apiService.createUser(this.user)
    .subscribe(
      (data: User) => {
        console.log('This shit executed: ' + data);
      }, (error) => {
        console.log(error)
      }
    )
    //this.router.navigateByUrl('/login')
  }

}
