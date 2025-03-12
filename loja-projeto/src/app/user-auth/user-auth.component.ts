import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { SignUp } from '../data-types';

@Component({
  selector: 'app-user-auth',
  standalone: false,
  templateUrl: './user-auth.component.html',
  styleUrl: './user-auth.component.css'
})
export class UserAuthComponent implements OnInit{
constructor(private user:UserService) { }

ngOnInit(): void {
}

signup(data:SignUp) {
this.user.userSignUp(data)
}
}
