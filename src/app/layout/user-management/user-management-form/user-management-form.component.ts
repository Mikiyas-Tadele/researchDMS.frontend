import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserModel } from '../model/user.model';
import { UserManagementService } from '../user-management.service';
import * as _ from 'underscore';
import { RoleModel } from '../model/role.model';

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
    roles: any = [];
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
               username: userModel.username,
               firstName: userModel.firstName,
               lastName: userModel.lastName,
               email: userModel.email,
               active: userModel.active,
               roleId: userModel.roleId
             });
          });
        }
        this.userFormGroup = new FormGroup({
           id: new FormControl(''),
           username: new FormControl(''),
           firstName: new FormControl(''),
           lastName: new FormControl(''),
           email: new FormControl(''),
           active: new FormControl(''),
           roleId: new FormControl('')

        });

        this.getRoles();
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

    back() {
        this.router.navigate(['/layout/users']);
    }

    getRoles() {
      this.userService
          .getRoles()
          .subscribe(res => {
              const roles = res as RoleModel[];
              for (let i = 0; i < roles.length; i++) {
                  const l = {
                      label: roles[i].name,
                      value: roles[i].id
                  };
                  this.roles.push(l);
              }
          });
  }

}
