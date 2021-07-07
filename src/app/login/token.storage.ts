import { Injectable } from '@angular/core';


const TOKEN_KEY = 'AuthToken';

@Injectable({
  providedIn: 'root'
})
export class TokenStorage {

  constructor() { }

  signOut() {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.clear();
  }

  public saveToken(token: string) {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY,  token);
  }

  public setUserName(username: string) {
    window.sessionStorage.setItem('user', username);
  }

  public getUserName() {
    return window.sessionStorage.getItem('user');
  }

  public setPosition(position: number) {
    return window.sessionStorage.setItem('position', String(position));
  }

  public getPosition() {
    return window.sessionStorage.getItem('position');
  }

  public setAuthority(authority: string) {
    window.sessionStorage.setItem('authority', authority);
  }

  public getAuthority() {
    return window.sessionStorage.getItem('authority');
  }

  public getToken(): string {
    return sessionStorage.getItem(TOKEN_KEY);
  }
}
