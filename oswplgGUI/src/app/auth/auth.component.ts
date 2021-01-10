import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

import { AuthService } from './auth.service';
import {LoginResponseModel} from './models/login-response.model';
import {SignupResponseModel} from './models/signup-response.model';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html'
})
export class AuthComponent {
  isLoginMode = true;
  isLoading = false;
  error: string = null;
  succesMessage: string;

  constructor(private authService: AuthService, private router: Router) {}

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }

    const username = form.value.username;
    const email = form.value.email;
    const password = form.value.password;



    this.isLoading = true;

    if (this.isLoginMode) {
      this.authService.login(username, password).subscribe(
        (resData) => {
          this.isLoading = false;
          this.router.navigate(['/dishes']);
        },
        errorMessage => {
          console.log(errorMessage);
          this.error = errorMessage;
          this.isLoading = false;
        }
      );
    } else {
      this.authService.signup(email, username, password).subscribe(
        (resData) => {
          console.log(resData);
          this.succesMessage = 'Pomyślnie dodano użytkownika';
          this.error = null;
          this.isLoading = false;
          this.router.navigate(['/dishes']);
        },
        errorMessage => {
          console.log(errorMessage);
          this.error = errorMessage;
          this.isLoading = false;
        }
      );
    }

    form.reset();
  }
}
