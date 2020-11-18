import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
  resetPasswordForm: FormGroup;
  submitted : boolean = false;
  resetMessage = '';
  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.resetPasswordForm = this.fb.group({
        username: ['', Validators.required],
        password: ['', Validators.required],
        confirmPassword: ['', [Validators.required, this.passwordMatcher.bind(this)]]
    })
  }
  get resetPasswordFormControl(){
      return this.resetPasswordForm.controls;
  }

  private passwordMatcher(control: FormControl): { [s: string]: boolean } {
    if (
        this.resetPasswordForm &&
        (control.value !== this.resetPasswordForm.controls.password.value)
    ) {
        return { passwordNotMatch: true };
    }
    return null;
}

  onSubmit(){
    this.submitted = true;
    if(this.resetPasswordForm.valid){
      this.authService.findUser(this.resetPasswordFormControl.username.value).subscribe((result)=>{
        if(result){
          this.authService.resetPassword(result, this.resetPasswordFormControl.confirmPassword.value).subscribe((result1)=>{
          if(result1){
            this.resetMessage = '';
              this.router.navigate(['login']);
          }
        });
      } else {
        this.resetMessage = 'User does not exist';
      }
    });
  }
}
}
