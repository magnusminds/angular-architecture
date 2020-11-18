import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  signupForm : FormGroup;
  submitted : boolean = false;
  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.signupForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['',[Validators.required, Validators.email]],
      username: ['', Validators.required],
      password: ['', Validators.required],
    })
  }

  get signupFormControl() {
    return this.signupForm.controls;
  }

  onSubmit(){
    this.submitted = true;
    if(this.signupForm.valid){
      const userObject = {
        firstName: this.signupFormControl.firstName.value,
        lastName: this.signupFormControl.lastName.value,
        email: this.signupFormControl.email.value,
        username: this.signupFormControl.username.value,
        password: this.signupFormControl.password.value
      };
      this.authService.add(userObject).then((result)=>{
          this.router.navigate(['login']);
      }).catch((error: any)=>{
          console.log(error);
      });
    }
  }
}
