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
          { field: 'username', header: 'User Name', hide: false },
          { field: 'firstName', header: 'First Name', hide: false },
          { field: 'lastName', header: 'Last Name', hide: false },
          { field: 'email', header: 'Email', hide: false },
          { field: 'activeDesc', header: 'Is Active', hide: false },
          { field: 'id', header: 'id', hide: true }
      ];

      this.userManagementService.getUserProfiles().subscribe(res => {
          this.users = res as UserModel[];
      });
  }

  editUser(data: UserModel) {
      this.router.navigate(['/layout/userForm/' + data.id ]);
  }

  addNewUser() {
   this.router.navigate(['/layout/userForm/0']);
  }
}
