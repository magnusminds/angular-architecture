import { Injectable } from '@angular/core';
import { NgxIndexedDBService } from 'ngx-indexed-db';
import { User } from 'src/app/shared/models/user.model';
import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService{
  loggedInFlag: boolean = false;
  headerLoginFlag$: Observable<any>;
  private headerLoginFlagSubject = new Subject<any>();

  constructor(private dbService: NgxIndexedDBService, private router: Router) {
    // this.deleteDatabase();
    this.headerLoginFlag$ = this.headerLoginFlagSubject.asObservable();
   }

   headerLoginFlag(flag){
     this.headerLoginFlagSubject.next(flag);
   }

  async add(user: User){
    await this.dbService.add('users', {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      username: user.username,
      password: user.password,
    }).subscribe((key)=>{
      console.log(key);
    })
  }

  findUser(username){
    return this.dbService.getByIndex('users', 'username', username);
  }

  deleteDatabase(){
    this.dbService.deleteDatabase().subscribe((deleted) => {
      console.log('Database deleted successfully: ', deleted);
    });
  }

  getAllUser() {
    return this.dbService.getAll('users');
  }

  resetPassword(user, newPassword){
        let obj = {
          id: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          username: user.username,
          password: newPassword,
        }
        return this.dbService.update('users', obj);
      }

  setAuthenticationFlag(authFlag){
    let loginFlagObject = {
      isAuthenticated: authFlag
    }
    localStorage.setItem('authenticationFlag', JSON.stringify(loginFlagObject));
  }

  // getAuthenticationFlag(){
  //   console.log(localStorage.getItem('authenticationFlag'));
  //     if(localStorage.getItem('authenticationFlag')){
  //       console.log(JSON.parse(localStorage.getItem('authenticationFlag')).isAuthenticated);
  //       this.loggedInFlag = JSON.parse(localStorage.getItem('authenticationFlag')).isAuthenticated;
  //     } else {
  //       this.loggedInFlag = false;
  //     }
  // }

  isAuthenticated(){
    return localStorage.getItem('authenticationFlag') ? JSON.parse(localStorage.getItem('authenticationFlag')).isAuthenticated : false;
  }
}
