import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { PostionModel } from './model/position.model';
import { UserModel } from './model/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserManagementService {

  constructor(private http: HttpClient, @Inject('BASE_API_URL') private baseUrl: string) { }

  addOrUpdateUser(data: UserModel) {
    return this.http.post(this.baseUrl + '/settings/addOrUpdateUser', data);
  }

  getUserProfiles() {
    return this.http.get(this.baseUrl + '/settings/systemUsers');
  }

  getUserProfile(id: number) {
    return this.http.get(this.baseUrl + '/settings/systemUser/' + id);
  }

  getWorkunits() {
    return this.http.get(this.baseUrl + '/settings/workUnits');
  }

  getTeamsForWorkUnits(id: number) {
    return this.http.get(this.baseUrl + '/settings/teamsForWorkUnit/' + id);
  }

  getAllTeams() {
    return this.http.get(this.baseUrl + '/settings/allTeams');
  }

  getAllPositions() {
    return this.http.get(this.baseUrl + '/settings/positions');
  }

  savePosition(data: PostionModel) {
    return this.http.post(this.baseUrl + '/settings/savePosition', data);
  }
}
