import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable()
export class NotLoggedGuard  {
  canActivate(_route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return true;
  }
}
