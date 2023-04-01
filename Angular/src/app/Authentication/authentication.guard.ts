import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import jwtDecode from 'jwt-decode';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationGuard implements CanActivate {
  constructor(private router: Router) {
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot):boolean {
      if (localStorage.getItem('token') != null) {
        const AllRoles = route.data['AllRoles'] as Array<string>;
        var mytoken : any = localStorage.getItem('token');
        var TokenDecode : any = jwtDecode(mytoken);
        const MyRole = TokenDecode.role;
        var SearchRole = AllRoles.find(a=>a == MyRole);
        if(SearchRole == undefined || SearchRole == null)
        {
          console.log("a");
          
          this.router.navigateByUrl('/forbidden');
          return false;
        }else {return true;}
      } else {
        this.router.navigateByUrl('/home');
        return false;
      }
  }
  
}
