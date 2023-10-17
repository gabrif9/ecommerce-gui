import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  token: string = ''
  authenticated: boolean = false;
  email: string = ''

  resMessageSubject: BehaviorSubject<string> = new BehaviorSubject('')

  constructor(private http: HttpClient, private router: Router) { }

  signIn(email: string, password: string) {
    if (!this.authenticated) {
      this.http.post('http://localhost:3000/user/login', { email: email, password: password }).subscribe({
        next: (res: any) => {
          this.token = res.token
          this.authenticated = true
          this.email = email
          this.router.navigate(['/homePage'])
        },
        error: (err) => {
          console.log(err.message)
        }
      })
    }
  }

  signUp(email: string, password: string){
    if(!this.authenticated) {
      this.http.post('http://localhost:3000/user/signup', { email: email, password: password }).subscribe({
        next: (res: any) => {
          this.signIn(email, password)
        },
        error: (err) => {
          if(err.status === 409){
            this.resMessageSubject.next(err.error.message)
          }
        }
      })
    }
  }
}
