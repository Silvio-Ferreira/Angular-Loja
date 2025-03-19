import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { product } from '../data-types';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-product-details',
  standalone: false,
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css'
})
export class ProductDetailsComponent implements OnInit{
  productData: undefined | product;
  productQuantity: number = 1;
  quantity: number = 1;

  constructor(private activeRoute:ActivatedRoute, private product: ProductService) { }

  ngOnInit(): void {
    let productId = this.activeRoute.snapshot.paramMap.get('productId');
    productId && this.product.getProduct(productId).subscribe((result)=>{
      this.productData = result
    })
  }

  handleQuantity(val:string) {
    if (this.productQuantity<99 && val === 'plus') {
      this.productQuantity +=1;
    }
    else {
      if (this.productQuantity>1 && val === 'min') {
        this.productQuantity -=1;
      }
    }

  }

  AddToCart() {
    if (this.productData) {
      this.product.quantity = this.productQuantity;
      if(!localStorage.getItem('user')) {
        // this.productData; localAddToCart
      }
    }
  }
}
