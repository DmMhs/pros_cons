import { Injectable, NgZone} from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase';

import 'rxjs/add/observable/fromPromise';
import 'rxjs/add/operator/toPromise';
import { EventEmitter } from 'protractor';
import { Observable } from 'rxjs';

@Injectable()
export class AuthService {

  token: string;
  email: string;

  constructor(
    private ngZone: NgZone,
    private router: Router,
    private afAuth: AngularFireAuth
  ) {}

  public navigate(commands: any[]): void {
    this.ngZone.run(() => this.router.navigate(commands)).then();
  }

  signupUser(email: string, password: string) {
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(
        response => {
          this.email = firebase.auth().currentUser.email;
          this.loginUser(email, password);
        }
      )
      .catch(
        error => {
          console.log(error);
        }
      );
  }

  signupWithGoogle() {
    this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider())
      .then(
        (credential) =>  {
          this.email = credential.user.email;
          this.token = this.getToken();
       }
      )
      .then(
        () => {
          this.navigate(['/']);
        }
      )
      .catch(
        error => console.log(error)
        );
  }

  loginUser(email: string, password: string) {
    this.afAuth.auth.signInWithEmailAndPassword(email, password)
    .then(
      response => {
        this.router.navigate(['/']);
        this.email = firebase.auth().currentUser.email;
        this.token =  this.getToken();
      }
    )
    .catch(
      error => console.log(error)
    );
  }


  logout() {
    this.router.navigate(['/signup']);
    this.afAuth.auth.signOut();
    this.token = undefined;
    this.email = undefined;
  }

  getToken() {
    firebase.auth().currentUser.getIdToken()
      .then(
        (token: string) => this.token = token
      );
    return this.token;
  }

  getEmail() {
    return this.email;
  }

  isAuthenticated() {
    const res = this.token !== undefined;
    return res;
  }
}
