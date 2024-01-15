import { HttpClient } from '@angular/common/http';
import { Injectable, NgZone, OnInit, inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService{

  resMessageSubject: BehaviorSubject<string> = new BehaviorSubject('')

  constructor(private http: HttpClient, private router: Router) { }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if(sessionStorage.getItem('userToken')) {
      return true
    } else {
      alert('You are not logged in')
      this.router.navigate(['login'])
      return false
    }
  }

  signIn(email: string, password: string) {
    if (!sessionStorage.getItem('userToken')) {
      this.http.post('http://localhost:3000/user/login', { email: email, password: password }).subscribe({
        next: (res: any) => {
          console.log(res.role)
          sessionStorage.setItem('userToken', res.token)
          sessionStorage.setItem('userEmail', email)
          sessionStorage.setItem('role', res.role)
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
    if (!sessionStorage.getItem('userToken')) {
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
    sessionStorage.removeItem('userToken')
    sessionStorage.removeItem('userEmail')
    sessionStorage.removeItem('role')
    this.router.navigate(['homePage'])
  }

  getAuthenticated() {
    return (!!sessionStorage.getItem('userToken'))
  }
}

export const authGuard: CanActivateFn = (next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean => {
  return inject(LoginService).canActivate(next, state);
}