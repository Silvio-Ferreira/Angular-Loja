import { Component, OnInit } from '@angular/core';
import { SellerService } from '../services/seller.service';
import { Router } from '@angular/router';
import { SignUp } from '../data-types';

@Component({
  selector: 'app-seller-auth',
  standalone: false,
  templateUrl: './seller-auth.component.html',
  styleUrl: './seller-auth.component.css'
})
export class SellerAuthComponent implements OnInit{
  showLogin = false
  authError:String='';
  constructor(private seller:SellerService){}


  ngOnInit():void{
    this.seller.reloadSeller()
  }

  signUp(data:SignUp):void{
    console.warn(data)
    this.seller.userSignUp(data)
  }

  login(data:SignUp):void{
    this.seller.userLogin(data)
    this.seller.isLoginError.subscribe((isError)=>{
      if(isError){
        this.authError="E-mail ou senha não correspondem!"
      }
    })
    console.warn(data)
  }

  openLogin(){
    this.showLogin = true
  }

  openSignUp(){
    this.showLogin = false
  }
}



