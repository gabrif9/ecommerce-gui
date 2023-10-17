import { Component } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {

  constructor(private signUpService: LoginService){
    signUpService.resMessageSubject.subscribe(resMessage => {
      console.log(resMessage)
    })
  }

  signUp(email: string, password: string){
    this.signUpService.signUp(email, password)
  }
}
