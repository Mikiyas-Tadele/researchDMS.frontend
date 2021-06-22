import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {


  constructor(private http: HttpClient, @Inject('BASE_API_URL') private baseUrl: string) { }

  getMyNumberOfTasks(status: number) {
     return this.http.get(this.baseUrl + '/dashboard/numberofMyTasks/' + status);
  }

  getMyNumberOfSubordinateTasks(status: number) {
    return this.http.get(this.baseUrl + '/dashboard/numberofMySubordinateTasks/' + status);
 }
 getMyTaskNotification() {
  return this.http.get(this.baseUrl + '/dashboard/myTaskNotification');
}
getMySubordinateTaskNotification() {
  return this.http.get(this.baseUrl + '/dashboard/mySubordinatesTaskNotification');
}
getMyTodayDueTask() {
  return this.http.get(this.baseUrl + '/dashboard/myTodayDueTasks');
}
getMySubordinatesTadyDueTask() {
  return this.http.get(this.baseUrl + '/dashboard/mySubordinatesTodyDueTask');
}
}

export enum TaskStatus {
  ASSIGNED= 5,
  ON_PROGRESS= 6,
  REASSIGNED= 7,
  CLOSED= 8,
  COMPLETED= 9,
  PENDING_WITH_SUPERVISOR= 10,
}
