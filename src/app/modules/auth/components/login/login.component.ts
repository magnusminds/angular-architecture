import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm : FormGroup;
  submitted : boolean = false;
  userFound;
  loginMessage = '';
  constructor(private fb: FormBuilder, private router: Router, private authService: AuthService) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    })
  }

  get loginFormControl() {
    return this.loginForm.controls;
  }

  onSubmit(){
    this.submitted = true;
    if(this.loginForm.valid){
     this.authService.findUser(this.loginFormControl.username.value).subscribe((result)=>{
      if(result){
          if(this.loginFormControl.password.value === result.password){
            console.log('login success');
            this.loginMessage = '';
            this.authService.setAuthenticationFlag(true);
            this.authService.headerLoginFlag(true);
            this.router.navigate(['dashboard']);
          } else {
            console.log('login failure');
            this.loginMessage = 'Invalid Username or password';
          }
      }
      else {
        this.loginMessage = 'User Does not exist';
      }
     });

    }
  }
}
