import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { login, SignUp } from '../data-types';

@Component({
  selector: 'app-user-auth',
  standalone: false,
  templateUrl: './user-auth.component.html',
  styleUrl: './user-auth.component.css'
})
export class UserAuthComponent implements OnInit{
  showLogin: boolean = false;
  authError:string="";

constructor(private user:UserService) { }

ngOnInit(): void {
  this.user.userAuthReload();
}

signup(data:SignUp) {
this.user.userSignUp(data);
}

login(data:login) {
  this.user.userLogin(data);
  this.user.invalidUserAuth.subscribe((result)=>{
    if (result) {
      this.authError="E-mail ou senha não correspondem!";
    }else{

    }
  })
}

openLogin(){
  this.showLogin = true
}

openSignUp(){
  this.showLogin = false
}

}
