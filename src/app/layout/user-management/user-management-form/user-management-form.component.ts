import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TeamsModel } from '../model/teams.model';
import { UserModel } from '../model/user.model';
import { WorkunitModel } from '../model/work.unit.model';
import { UserManagementService } from '../user-management.service';
import * as _ from 'underscore';

@Component({
  selector: 'app-user-management-form',
  templateUrl: './user-management-form.component.html',
  styleUrls: ['./user-management-form.component.scss']
})
export class UserManagementFormComponent implements OnInit {

  userFormGroup: FormGroup;
    teamsList: any = [];
    teamsListFiltered: any = [];
    workUnitList: any = [];
    constructor(
        private userService: UserManagementService,
        private router: Router,
        private route: ActivatedRoute
    ) {}

    ngOnInit() {
        const id = this.route.snapshot.params['id'];
        if (id !== '0') {
          this.userService.getUserProfile(id).subscribe(res => {
             const userModel = res as UserModel;
             this.userFormGroup.setValue({
               id: userModel.id,
               userName: userModel.userName,
               teamId: userModel.teamId,
               fullName: userModel.fullName,
               mobile: userModel.mobile,
               extension: userModel.extension
             });
          });
        }
        this.userFormGroup = new FormGroup({
           id: new FormControl(''),
           userName: new FormControl(''),
           teamId: new FormControl(''),
           fullName: new FormControl(''),
           mobile: new FormControl(''),
           extension: new FormControl('')

        });

        this.getWorkUnits();
        this.getAllTeams();
    }

    getWorkUnits() {
        this.userService
            .getWorkunits()
            .subscribe(res => {
                const wu = res as WorkunitModel[];
                for (let i = 0; i < wu.length; i++) {
                    const l = {
                        label: wu[i].name,
                        value: wu[i].id
                    };
                    this.workUnitList.push(l);
                }
            });
    }

    getAllTeams() {
      this.userService.getAllTeams().subscribe(res => {
        const wu = res as TeamsModel[];
         for (let i = 0; i < wu.length; i++) {
             const l = {
                 label: wu[i].name,
                 value: wu[i].id,
                 code: wu[i].workUnitId
             };
             this.teamsList.push(l);
         }
 });
    }
    filterTeams(event: any) {
      console.log(event);
      this.teamsListFiltered = _.where(this.teamsList, {
        code: event.value
    });
    }
    save({ value, valid }: { value: UserModel; valid: boolean }) {
        if (valid) {
            this.userService.addOrUpdateUser(value).subscribe(res => {
              console.log('data saved correctly!');
            });
        }
    }

    clearForm() {
        this.userFormGroup.reset();
    }

    returnToTechnicalAppraisalForm() {
        this.router.navigate(['/users']);
    }

}
