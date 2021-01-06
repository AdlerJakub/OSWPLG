import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Router} from '@angular/router';
import {catchError, tap} from 'rxjs/operators';
import {throwError, BehaviorSubject} from 'rxjs';

import {User} from './models/user.model';
import {LoginResponseModel} from './models/login-response.model';
import {SignupResponseModel} from './models/signup-response.model';

@Injectable({providedIn: 'root'})
export class AuthService {
  user = new BehaviorSubject<User>(null);
  private tokenExpirationTimer: any;

  constructor(private http: HttpClient, private router: Router) {
  }

  signup(email: string, username: string, password: string) {
    return this.http
      .post<SignupResponseModel>(
        '/api/signup/',
        {
          email,
          username,
          password,
        }
      )
      .pipe(
        catchError(this.handleError)
      );
  }

  login(username: string, password: string) {
    return this.http
      .post<LoginResponseModel>(
        '/api/login/',
        {
          username,
          password
        }
      )
      .pipe(
        catchError(this.handleError),
        tap(resData => {
          this.handleAuthentication(
            username,
            resData.access,
            3600
          );
        })
      );
  }

  autoLogin() {
    const userData: {
      username: string;
      _token: string;
      _tokenExpirationDate: string;
    } = JSON.parse(localStorage.getItem('userData'));
    if (!userData) {
      return;
    }

    const loadedUser = new User(
      userData.username,
      userData._token,
      new Date(userData._tokenExpirationDate)
    );

    if (loadedUser.token) {
      this.user.next(loadedUser);
      const expirationDuration =
        new Date(userData._tokenExpirationDate).getTime() -
        new Date().getTime();
      this.autoLogout(expirationDuration);
    }
  }

  logout() {
    this.user.next(null);
    this.router.navigate(['/']);
    localStorage.removeItem('userData');
    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
    }
    this.tokenExpirationTimer = null;
  }

  autoLogout(expirationDuration: number) {
    this.tokenExpirationTimer = setTimeout(() => {
      this.logout();
    }, expirationDuration);
  }

  private handleAuthentication(
    username: string,
    token: string,
    expiresIn: number
  ) {
    const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
    const user = new User(username, token, expirationDate);
    this.user.next(user);
    this.autoLogout(expiresIn * 1000);
    localStorage.setItem('userData', JSON.stringify(user));
  }

  private handleError(errorRes: HttpErrorResponse) {
    console.log(errorRes);
    let errorMessage = 'An unknown error occurred!';
    if (!errorRes.error) {
      return throwError(errorMessage);
    }
    if (errorRes.error.detail) {
      switch (errorRes.error.detail) {
        case 'No active account found with the given credentials':
          errorMessage = 'Błędny login lub hasło!';
          break;
      }
    } else {
      switch (errorRes.error.username[0]) {
        case 'A user with that username already exists.':
          errorMessage = 'Użytkownik o tej nazwie już istnieje!';
          break;
      }
    }

    return throwError(errorMessage);
  }
}
