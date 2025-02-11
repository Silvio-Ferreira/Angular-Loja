import { Component, OnInit } from '@angular/core';
import { SellerService } from '../services/seller.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-seller-auth',
  standalone: false,
  templateUrl: './seller-auth.component.html',
  styleUrl: './seller-auth.component.css'
})
export class SellerAuthComponent implements OnInit{
  constructor(private seller:SellerService, private router:Router){}

  ngOnInit(): void {}

  signUp(data:object):void{
    console.warn(data)
    this.seller.userSignUp(data).subscribe((result)=>{
      if (result){
        this.router.navigate(['seller-home'])
      }
    });
  }
}



