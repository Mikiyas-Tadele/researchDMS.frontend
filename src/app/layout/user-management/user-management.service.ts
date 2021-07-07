import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { UserModel } from './model/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserManagementService {

  constructor(private http: HttpClient, @Inject('BASE_API_URL') private baseUrl: string) { }

  addOrUpdateUser(data: UserModel) {
    return this.http.post(this.baseUrl + '/auth/create-user', data);
  }

  getUserProfiles() {
    return this.http.get(this.baseUrl + '/auth/users');
  }

  getUserProfile(id: number) {
    return this.http.get(this.baseUrl + '/auth/user/' + id);
  }

  getRoles() {
    return this.http.get(this.baseUrl + '/auth/roles');
  }
}
