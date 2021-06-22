import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { DashboardService, TaskStatus } from './dashboard.service';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss'],
    animations: [routerTransition()]
})
export class DashboardComponent implements OnInit {
    public alerts: Array<any> = [];
    public sliders: Array<any> = [];
    taskOptions: any = [{label: 'Select Options', value: 0}, {label: 'My Tasks', value: 1}, {label: 'My Subordinate Tasks', value: 2} ];
    taskOption: number;
    assignedTasks: number;
    tasksInProgress: number;
    tasksCompleted: number;
    tasksClosed: number;
    choosenWhichTask: number;

    constructor(private dashboardService: DashboardService) {
        this.sliders.push(
            {
                imagePath: 'assets/images/slider1.jpg',
                label: 'First slide label',
                text:
                    'Nulla vitae elit libero, a pharetra augue mollis interdum.'
            },
            {
                imagePath: 'assets/images/slider2.jpg',
                label: 'Second slide label',
                text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
            },
            {
                imagePath: 'assets/images/slider3.jpg',
                label: 'Third slide label',
                text:
                    'Praesent commodo cursus magna, vel scelerisque nisl consectetur.'
            }
        );

        this.alerts.push(
            {
                id: 1,
                type: 'success',
                message: `Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Voluptates est animi quibusdam praesentium quam, et perspiciatis,
                consectetur velit culpa molestias dignissimos
                voluptatum veritatis quod aliquam! Rerum placeat necessitatibus, vitae dolorum`
            },
            {
                id: 2,
                type: 'warning',
                message: `Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Voluptates est animi quibusdam praesentium quam, et perspiciatis,
                consectetur velit culpa molestias dignissimos
                voluptatum veritatis quod aliquam! Rerum placeat necessitatibus, vitae dolorum`
            }
        );
    }

    ngOnInit() {
       this.dashboardService.getMyNumberOfTasks(TaskStatus.ASSIGNED).subscribe(assignedNumber => {
             this.assignedTasks = assignedNumber as number;
       });
       this.dashboardService.getMyNumberOfTasks(TaskStatus.ON_PROGRESS).subscribe(tasksInprogressNumber => {
        this.tasksInProgress = tasksInprogressNumber as number;
       });
       this.dashboardService.getMyNumberOfTasks(TaskStatus.CLOSED).subscribe(tasksClosedNumber => {
        this.tasksClosed = tasksClosedNumber as number;
       });
       this.dashboardService.getMyNumberOfTasks(TaskStatus.COMPLETED).subscribe(tasksCompletedNumber => {
        this.tasksCompleted = tasksCompletedNumber as number;
       });
    }

    public closeAlert(alert: any) {
        const index: number = this.alerts.indexOf(alert);
        this.alerts.splice(index, 1);
    }

    getTasks(event: any) {
          this.choosenWhichTask = event.value;
         if (event.value === 1) {
            this.dashboardService.getMyNumberOfTasks(TaskStatus.ASSIGNED).subscribe(assignedNumber => {
                this.assignedTasks = assignedNumber as number;
          });
          this.dashboardService.getMyNumberOfTasks(TaskStatus.ON_PROGRESS).subscribe(tasksInprogressNumber => {
           this.tasksInProgress = tasksInprogressNumber as number;
          });
          this.dashboardService.getMyNumberOfTasks(TaskStatus.CLOSED).subscribe(tasksClosedNumber => {
           this.tasksCompleted = tasksClosedNumber as number;
          });
          this.dashboardService.getMyNumberOfTasks(TaskStatus.COMPLETED).subscribe(tasksCompletedNumber => {
           this.tasksClosed = tasksCompletedNumber as number;
          });
         } else if (event.value === 2) {
            this.dashboardService.getMyNumberOfSubordinateTasks(TaskStatus.ASSIGNED).subscribe(assignedNumber => {
                this.assignedTasks = assignedNumber as number;
          });
          this.dashboardService.getMyNumberOfSubordinateTasks(TaskStatus.ON_PROGRESS).subscribe(tasksInprogressNumber => {
           this.tasksInProgress = tasksInprogressNumber as number;
          });
          this.dashboardService.getMyNumberOfSubordinateTasks(TaskStatus.CLOSED).subscribe(tasksClosedNumber => {
           this.tasksClosed = tasksClosedNumber as number;
          });
          this.dashboardService.getMyNumberOfSubordinateTasks(TaskStatus.COMPLETED).subscribe(tasksCompletedNumber => {
           this.tasksCompleted = tasksCompletedNumber as number;
          });
         }
    }
}
