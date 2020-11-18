import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  userData = [];
  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.authService.getAllUser().subscribe((result)=>{
      this.userData = result ? result : [];
    })
  }
}
