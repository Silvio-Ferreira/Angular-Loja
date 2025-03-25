import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { cart } from '../data-types';

@Component({
  selector: 'app-cart-page',
  standalone: false,
  templateUrl: './cart-page.component.html',
  styleUrl: './cart-page.component.css'
})
export class CartPageComponent implements OnInit{
cartData:cart[] | undefined;

  constructor(private product:ProductService) {}

  ngOnInit(): void {
    this.product.currentCart().subscribe((result)=>{
      this.cartData = result;
    })
  }
}
