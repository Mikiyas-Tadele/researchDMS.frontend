import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { DashboardService } from '../../dashboard.service';
import { DashboardDueTaskModel } from '../../models/dashboard.due.task';

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.scss']
})
export class TimelineComponent implements OnInit, OnChanges {
   @Input() value: number;
   models: any = [];

  constructor(private dashboardService: DashboardService) { }
  ngOnChanges(changes: SimpleChanges): void {
    const value = changes['value'].currentValue;
       if (value === 1) {
           this.dashboardService.getMyTodayDueTask().subscribe(res => {
               this.models = res as DashboardDueTaskModel[];
           });
       } else if (value === 2) {
        this.dashboardService.getMySubordinatesTadyDueTask().subscribe(res => {
            this.models = res as DashboardDueTaskModel[];
        });
       }
  }

  ngOnInit() {
    this.dashboardService.getMyTodayDueTask().subscribe(res => {
        this.models = res as DashboardDueTaskModel[];
    });
  }

}
