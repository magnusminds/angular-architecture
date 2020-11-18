import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  isLoggedInFlag: boolean = false;
  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.isLoggedInFlag = this.authService.isAuthenticated();
    this.authService.headerLoginFlag$.subscribe((data)=>{
        this.isLoggedInFlag = data;
    })
  }

  logOut(){
    this.authService.setAuthenticationFlag(false);
    this.authService.headerLoginFlag(false);
    this.router.navigate(['login']);
    this.isLoggedInFlag = false;
  }

}
