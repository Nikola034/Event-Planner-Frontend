import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from '@angular/router';
import { JwtService } from './jwt.service';


@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private authService: JwtService
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
  ): boolean {
    const userRole = this.authService.getRoleFromToken();

    if (userRole == null) {
      this.router.navigate(['login']);
      return false;
    }
    if (!route.data['role'].includes(userRole)) {
      this.router.navigate(['home']);
      return false;
    }
    return true;
  }
}
