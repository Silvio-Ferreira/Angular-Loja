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
  constructor(private seller:SellerService, private router:Router){}

  ngOnInit(): void {}

  signUp(data:SignUp):void{
    this.seller.userSignUp(data)
  }
}



