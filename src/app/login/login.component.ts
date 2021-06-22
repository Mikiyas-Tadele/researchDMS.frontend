import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { routerTransition } from '../router.animations';
import { LoginService } from './login-service.service';
import { TokenStorage } from './token.storage';
import { FormGroup, FormControl } from '@angular/forms';
import {MessageService} from 'primeng/api';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    animations: [routerTransition()]
})
export class LoginComponent implements OnInit {
    private  returnUrl: string;
    private _authToken: string;
    credentials = {username: '', password: ''};
    authenticated: FormGroup;
    authenticatedResult: boolean;
    errorMessage: string;
    session: any;

    constructor(
      public router: Router,
      private route: ActivatedRoute,
      private loginService: LoginService,
      private token: TokenStorage,
      private messageService: MessageService
    ) {}

    ngOnInit() {
        this.loginService.logout();

        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || 'dashboard';
        this.authenticated = new FormGroup({
          username: new FormControl(''),
          password: new FormControl('')
        });
    }

    onLoggedin({value, valid}: { value: Authenticated, valid: boolean }) {
        this.loginService.login(value.username, value.password).subscribe(
            (data) => {
              this.token.saveToken(data['accessToken']);
              this.token.setUserName(value.username);
              this.token.setPosition(data['position']);
                this.router.navigate([this.returnUrl]);
            },
            error => {
              console.log(error);
              this.messageService.add({severity: 'error', summary: 'Error Message', detail: error.error.message});
            });
    }
}

export interface Authenticated {
    username: string;
    password: string;
  }
