import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  signupForm: FormGroup;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.signupForm = new FormGroup({
      'email': new FormControl(null,
        [
          Validators.required,
          Validators.email,
          Validators.maxLength(100)
        ]),
      'passwordData': new FormGroup({
        'password': new FormControl(null,
          [
            Validators.required,
            Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{6,100})/),
          ]),
        'confirmPassword': new FormControl(null, Validators.required)
      }, this.passwordConfirmed.bind(this))
    });
  }

  onSignup() {
    console.log(this.signupForm);
    const email = this.signupForm.get('email').value;
    const pass = this.signupForm.get('passwordData.password').value;
    this.authService.signupUser(email, pass);
  }

  onSignupWithGoogle() {
    this.authService.signupWithGoogle();
  }

  onLogIn() {
    this.router.navigate(['/login']);
  }

  passwordConfirmed(control: FormGroup) {
    if (control.controls.password.value === control.controls.confirmPassword.value) {
      return null;
    } else {
      return {'passwordsM': true};
    }
  }
}
