import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';

import { DashboardService } from '../../dashboard.service';
import { DashboardNotificationModel } from '../../models/dashboard.notification.model';

@Component({
    selector: 'app-notification',
    templateUrl: './notification.component.html',
    styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements OnInit, OnChanges {
    @Input() wichTask: number;
    notifications: any = [];
    constructor(private dashboardService: DashboardService) { }
    ngOnInit() {
        this.dashboardService.getMyTaskNotification().subscribe(res => {
            this.notifications = res as DashboardNotificationModel[];
        });
     }
     ngOnChanges(changes: SimpleChanges) {
       const value = changes['wichTask'].currentValue;
       if (value === 1) {
           this.dashboardService.getMyTaskNotification().subscribe(res => {
               this.notifications = res as DashboardNotificationModel[];
           });
       } else if (value === 2) {
        this.dashboardService.getMySubordinateTaskNotification().subscribe(res => {
            this.notifications = res as DashboardNotificationModel[];
        });
       }
     }
}
