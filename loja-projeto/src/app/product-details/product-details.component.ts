import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { cart, product } from '../data-types';
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
  cartData: product | undefined;

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

      let user = localStorage.getItem('user');

      if (user) {
        let userId = user && JSON.parse(user).id;
        this.product.getCartList(userId);
        this.product.cartData.subscribe((result)=>{
        let item = result.filter(
          (item:product)=>
            productId?.toString() === item.productId?.toString()
        );

        if (item.length) {
          this.cartData = item[0];
          this.removeCart=true;
        }
        })
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

//   AddToCart() {
//     if (this.productData) {
//         this.productData.quantity = this.productQuantity;

//         let user = localStorage.getItem('user');
//         let userId = user ? JSON.parse(user).id : null;

//         if (userId) { // Se estiver logado, salva no banco de dados
//             let cartData: cart = {
//                 ...this.productData,
//                 userId,
//                 productId: this.productData.id,
//             };
//             delete cartData.id;

//             this.product.addToCart(cartData).subscribe((result) => {
//                 if (result) {
//                     alert("PRODUTO SALVO NO CARRINHO!");
//                 }
//             });
//         } else {
//             this.product.localAddToCart(this.productData);
//             this.removeCart = true;
//         }
//     }
// }

  // 10:10
   AddToCart() {
     if (this.productData) {
       this.productData.quantity = this.productQuantity;
       if(!localStorage.getItem('user')) {
         this.product.localAddToCart(this.productData);
         this.removeCart=true;
       }else {
         let user = localStorage.getItem('user');
         let userId = user && JSON.parse(user).id
         let cartData:cart = {
           ...this.productData,
           userId,
           productId: this.productData.id,
         }
         delete cartData.id;

         this.product.addToCart(cartData).subscribe((result)=>{
           if (result) {
             this.product.getCartList(userId);
             this.removeCart = true;
           }
         })
       }
     }
   }
    //  AddToCart() {
    //     if (this.productData) {
    //         this.productData.quantity = this.productQuantity;
    //         let user = localStorage.getItem('user');
    //         let userId = user ? JSON.parse(user).id : null;

    //         if (!userId) {
    //             // Usuário NÃO está logado -> Salva no localStorage
    //             this.product.localAddToCart(this.productData);
    //             this.removeCart = true;
    //         } else {
    //             // Usuário ESTÁ logado -> Salva no banco de dados
    //             let cartData: cart = {
    //                 ...this.productData,
    //                 userId,
    //                 productId: this.productData.id,
    //             };
    //             delete cartData.id;

    //             this.product.addToCart(cartData).subscribe((result) => {
    //                 if (result) {
    //                     alert("PRODUTO CADASTRADO COM SUCESSO!");
    //                     this.removeCart = true; // Atualiza botão
    //                 }
    //             });
    //         }
    //     }
    // }

  RemoveToCart(productId:string) {
    if (!localStorage.getItem('user')) {
      this.product.removeItemFromCart(productId);

    }else {
      let user = localStorage.getItem('user');
      let userId = user && JSON.parse(user).id

      this.cartData && this.product.removeToCart(this.cartData.id)
      .subscribe((result)=>{
        if (result) {
          this.product.getCartList(userId);
        }
      })
      this.removeCart = false;
    }

  }
}
