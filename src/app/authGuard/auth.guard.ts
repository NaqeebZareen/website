import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { JwtHelper } from '../services/jwtHelper/jwt-helper.service';

@Injectable({
  providedIn: 'root'
})
// this service is used for to navigate user to different view ,open routes to autnticated user 
export class AuthGuard implements CanActivate {

  constructor(private jwtHelperService: JwtHelper, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    if (this.jwtHelperService.verifyToken()) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }

}
