import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate{

  constructor(private router: Router, private authService: AuthService) { }

  canActivate(){
    if(!this.authService.isAuthenticated()) {
      this.router.navigate(['login']);
      return false;
    }
      return true;
   }
}
