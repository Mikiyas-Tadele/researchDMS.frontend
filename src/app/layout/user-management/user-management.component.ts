import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserModel } from './model/user.model';
import { UserManagementService } from './user-management.service';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.scss']
})
export class UserManagementComponent implements OnInit {

  users: any = [];
  userColumns: any = [];
  isAdd = false;

  constructor(private userManagementService: UserManagementService,
     private router: Router) {}

  ngOnInit() {
      this.userColumns = [
          { field: 'userName', header: 'User Name', hide: false },
          { field: 'fullName', header: 'Full Name', hide: false },
          { field: 'teamDesc', header: 'Team', hide: false },
          { field: 'mobile', header: 'Mobile Phone', hide: false },
          { field: 'extension', header: 'Extension', hide: false },
          { field: 'id', header: 'id', hide: true }
      ];

      this.userManagementService.getUserProfiles().subscribe(res => {
          this.users = res as UserModel[];
      });
  }

  editUser(data: UserModel) {
      this.router.navigate(['/userForm/' + data.id ]);
  }

  addNewUser() {
   this.router.navigate(['/userForm/0']);
  }

  gotoPosition() {
    this.router.navigate(['/position']);
  }
}
