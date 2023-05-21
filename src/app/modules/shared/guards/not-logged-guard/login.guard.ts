import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
} from '@angular/router';

@Injectable()
export class NotLoggedGuard implements CanActivate {
  canActivate(_route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return true;
  }
}
