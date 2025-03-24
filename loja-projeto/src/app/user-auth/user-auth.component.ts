import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { cart, login, product, SignUp } from '../data-types';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-user-auth',
  standalone: false,
  templateUrl: './user-auth.component.html',
  styleUrl: './user-auth.component.css'
})
export class UserAuthComponent implements OnInit{
  showLogin: boolean = false;
  authError:string="";

constructor(private user:UserService, private product:ProductService) { }

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
      this.localCartToRemoveCart()
    }
  })
}

openLogin(){
  this.showLogin = true
}

openSignUp(){
  this.showLogin = false
}

localCartToRemoveCart() {
  let data = localStorage.getItem('localCart');
  let user = localStorage.getItem('user');
  let userId = user && JSON.parse(user).id;
  if(data) {
    let cartDataList:product[] = JSON.parse(data);


    cartDataList.forEach((product:product, index)=>{
      let cartData: cart = {
        ...product,
        productId:product.id,
        userId,
      };

      delete cartData.id;

      setTimeout(() => {
        this.product.addToCart(cartData).subscribe((result)=>{
          if (result) {
            console.warn("Dados salvos no banco de dados!")
          }
        })
      }, 500);
      if (cartDataList.length===index+1) {
        localStorage.removeItem('localCart');
      }
    })
  }
  setTimeout(() => {
    this.product.getCartList(userId);
  }, 2000);
}

}
