import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  @ViewChild('f') loginForm: NgForm;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {}

  onLogin(form: NgForm) {
    const email = form.value.email;
    const password = form.value.password;

    this.authService.loginUser(email, password);
  }

  onSignup() {
    this.router.navigate(['/signup']);
  }
}
