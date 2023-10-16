import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  token: string = ''
  authenticated: boolean = false;

  constructor(private http: HttpClient, private router: Router) { }

  signIn(email: string, password: string) {
    if(!this.authenticated) {
      this.http.post('http://localhost:3000/user/login', {email: email, password: password}).subscribe({
      next: (res: any) => {
        this.token = res.token
        this.authenticated = true
        this.router.navigate(['/homePage'])
      },
      error: (err) => {
        console.log(err.message)
      }
    })
    }
  }
}
