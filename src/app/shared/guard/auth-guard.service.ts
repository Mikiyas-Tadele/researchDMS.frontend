import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {Injectable} from '@angular/core';
import { LoginService } from '../../login/login-service.service';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(
    private router: Router,
    private loginService: LoginService) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):  boolean {

    if (!this.loginService.isAuthenticated()) {
      this.router.navigate(['/login'], { queryParams: { returnUrl: state.url }});
      return false;
    }

    return true;
  }
}
