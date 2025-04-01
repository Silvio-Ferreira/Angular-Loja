import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { cart, order } from '../data-types';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout',
  standalone: false,
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css'
})
export class CheckoutComponent implements OnInit {
  totalPrice:number | undefined;
  cartData:cart[] | undefined;
  orderMsg: string | undefined;

  constructor (private product:ProductService, private router:Router) {

  }

  ngOnInit(): void {
    this.product.currentCart().subscribe((result)=>{
     let price = 0;
     this.cartData = result;
      result.forEach((item)=>{
        if (item.quantity) {
          price = price + (+item.price* +item.quantity);
        }

      });
      this.totalPrice = price+20-(price/10);
    })
  }

  orderNow(data:{email:string, address:string, contact:string}) {
    let user = localStorage.getItem('user');
    let userId = user && JSON.parse(user).id;

    if (this.totalPrice) {
      let orderData:order = {
        ...data,
        totalPrice: Number(this.totalPrice.toFixed(2)),
        userId,
        id: undefined
      }

      this.cartData?.forEach((item)=>{
        setTimeout(() => {
          item.id && this.product.deleteCartItems(item.id)
        }, 700);
      })
      this.product.orderNow(orderData).subscribe((result)=>{
        if (result) {
          this.orderMsg = "Pedido realizado com sucesso!"

          setTimeout(() => {
            this.router.navigate(['/my-orders']);
            this.orderMsg = undefined;
          }, 4000);
        }
      })
    }
  }
}

