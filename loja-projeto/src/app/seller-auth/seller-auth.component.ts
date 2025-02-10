import { Component, OnInit } from '@angular/core';
import { SellerService } from '../services/seller.service';

@Component({
  selector: 'app-seller-auth',
  standalone: false,
  templateUrl: './seller-auth.component.html',
  styleUrl: './seller-auth.component.css'
})
export class SellerAuthComponent implements OnInit{
  constructor(private seller:SellerService){}

  ngOnInit(): void {}

  signUp(data:object):void{
    console.warn(data)
    this.seller.userSignUp(data).subscribe((result)=>
      console.warn(result)
    );
  }
}


// 1 e 30 (tempo do vídeo)
