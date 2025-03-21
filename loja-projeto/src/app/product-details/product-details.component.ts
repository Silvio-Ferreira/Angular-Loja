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
  removeCart = false;

  constructor(private activeRoute:ActivatedRoute, private product: ProductService) { }

  ngOnInit(): void {
    let productId = this.activeRoute.snapshot.paramMap.get('productId');
    productId && this.product.getProduct(productId).subscribe((result)=>{
      this.productData = result;
      let cartData = localStorage.getItem('localCart');
      if (productId && cartData) {
        let items = JSON.parse(cartData);
        items = items.filter((item:product)=>productId===item.id.toString()); //O id já estava sendo tratado como string, caso ocorra erro, remova o toString
        if (items.length) {
          this.removeCart=true;
        }else{
          this.removeCart=false;
        }
      }
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
      this.productData.quantity = this.productQuantity;
      if(localStorage.getItem('user')) {
        this.product.localAddToCart(this.productData);
        this.removeCart=true;
      }
    }
  }

  RemoveToCart(productId:string) {
    this.product.removeItemFromCart(productId);
    this.removeCart=false;
  }
}

//9:40