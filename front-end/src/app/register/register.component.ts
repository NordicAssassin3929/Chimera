import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../models/User';
import { ApiService } from "../services/api.service";
import { FormGroup, FormBuilder } from '@angular/forms'
import { pipe } from 'rxjs';
import {Observable} from "rxjs";
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.sass']
})
export class RegisterComponent implements OnInit {
  contactForm: FormGroup;
  userRegistrationForm: FormGroup;
  user: User;
  userExists: boolean

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

  checkIfUserExists(callback) {
    this.user = this.userRegistrationForm.value
    console.log("2. callback here is the function passed as argument above...")
    this.apiService.checkIfUserExists(this.user.email)
      .pipe(
        map(data => data))
      .subscribe(e => {
        console.log("3. start async operation...")
        console.log("4. finished async operation, calling the callback, passing the result...")
        callback(e.userExists)
      })
  }

  onSubmit() {
    let userExists = null
    console.log("1. function called...")
    this.checkIfUserExists((result: boolean) => {
      // 5. Received the result from the async function,
      //    now do whatever you want with it:
      console.log("5. result is: ", result);
      userExists = result
      this.userExistsValidator(userExists)
  });
  }

  userExistsValidator(userExists: boolean): void {
    this.user = this.userRegistrationForm.value
    let email = null
    // check if userExists
    if (userExists) {
      console.log('If')
      this.apiService.getUser(this.user.email)
        .subscribe(
          async (data: any) => {
            email = await data.email
            console.log('email: ' + email)
            console.log('this.user.email: ' + this.user.email)
            if (this.user.email !== email && email !== undefined) {
              //this.createUser()
            }
            else {
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
      this.createUser()
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
