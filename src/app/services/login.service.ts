import { HttpClient } from '@angular/common/http';
import { Injectable, NgZone, OnInit, inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService{

  private authenticated: boolean = false;

  resMessageSubject: BehaviorSubject<string> = new BehaviorSubject('')

  constructor(private http: HttpClient, private router: Router) { }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if(localStorage.getItem('userToken')) {
      return true
    } else {
      alert('You are not logged in')
      this.router.navigate(['login'])
      return false
    }
  }

  signIn(email: string, password: string) {
    if (!this.authenticated) {
      this.http.post('http://localhost:3000/user/login', { email: email, password: password }).subscribe({
        next: (res: any) => {
          localStorage.setItem('userToken', res.token)
          localStorage.setItem('userEmail', email)
          this.router.navigate(['homePage'])
          return true
        },
        error: (err) => {
          console.log(err.message)
        }
      })
    }
  }

  signUp(email: string, password: string) {
    if (!this.authenticated) {
      this.http.post('http://localhost:3000/user/signup', { email: email, password: password }).subscribe({
        next: (res: any) => {
          this.signIn(email, password)
        },
        error: (err) => {
          if (err.status === 409) {
            this.resMessageSubject.next(err.error.message)
          }
        }
      })
    }
  }


  logout(){
    localStorage.removeItem('userToken')
    localStorage.removeItem('userEmail')
    this.router.navigate(['homePage'])
  }

  getAuthenticated() { return this.authenticated }
}

export const authGuard: CanActivateFn = (next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean => {
  return inject(LoginService).canActivate(next, state);
}