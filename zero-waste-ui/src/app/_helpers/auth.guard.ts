import { Injectable } from '@angular/core';
import {
  Router,
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { map } from 'rxjs';
import { AuthService } from '../_services/auth.service';
import { TokenStorageService } from '../_services/token-storage.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private authService: AuthService,
    private tokenStorage: TokenStorageService
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const userDetails = this.tokenStorage.getUser();
    if (
      userDetails &&
      Object.keys(userDetails).length != 0 &&
      Object.getPrototypeOf(userDetails) === Object.prototype
    ) {
      //authorised so return true
      return true;
      return this.authService.isLoggedIn().pipe(
        map(
          (data) => {
            return true;
          },
          (err: any) => {
            console.log(err);
            return false;
          }
        )
      );
      return true;
    } else {
      // not logged in so redirect to login page with the return url
      this.router.navigate(['/account/login']);
      return false;
    }
  }
}
