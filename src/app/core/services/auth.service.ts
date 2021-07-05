import { Injectable } from '@angular/core';
import { User } from 'src/app/models/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  private _userData: any;
  private _loggedIn: boolean = false;
  private _redirectUrl: string = "";

  constructor() { }

  public authenticate(userData: User) {
    this._userData = userData;
    this._loggedIn = true;
    sessionStorage.setItem('AUTH_TOKEN', userData.token);
    sessionStorage.setItem('USER', JSON.stringify(userData.user));
  }

  public getUserData(): User {
    return this._userData;
  }

  public getToken(): string {
    return this._userData.token;
  }

  public isLoggedIn(): boolean {
    return this._loggedIn;
  }

  public logout(): void {
    this._loggedIn = false;
    sessionStorage.removeItem('AUTH_TOKEN');
    sessionStorage.removeItem('USER');
  }

  public setRedirectUrl(url: string): void {
    this._redirectUrl = url;
  }

  public getRedirectUrl(): string {
    var url = this._redirectUrl;
    this._redirectUrl = '';
    return url;
  }

}