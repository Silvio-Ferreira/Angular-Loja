import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ProductService } from '../services/product.service';
import { product } from '../data-types';


@Component({
  selector: 'app-header',
  standalone: false,
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent  implements OnInit{
  menuType: string='default';
  sellerName: string = "";
  userName: string = "";
  searchResult: undefined | product[];
  cartItems = 0;

  constructor(private route:Router, private product:ProductService){}

  ngOnInit(): void{
    this.route.events.subscribe((val:any)=>{
      if(val.url){
        if(localStorage.getItem('seller') && val.url.includes('seller')){
          this.menuType="seller";
          if(localStorage.getItem('seller')){
            let sellerStore = localStorage.getItem('seller');
            let sellerData = sellerStore && JSON.parse(sellerStore)[0];
            this.sellerName = sellerData.name;
            this.menuType='seller';
          }
        }else if (localStorage.getItem('user')) {
          let userStore = localStorage.getItem('user');
          let userData = userStore && JSON.parse(userStore);
          this.userName = userData.name;
          this.menuType='user';
          this.product.getCartList(userData.id);
        }

        else {
          this.menuType='default'
        }
      }
    });
    let cartData = localStorage.getItem('localCart');
    if (cartData) {
      this.cartItems = JSON.parse(cartData).length
    }

    this.product.cartData.subscribe((items)=> {
      this.cartItems = items.length
    });

  }

  logout(){
    localStorage.removeItem('seller');
    this.route.navigate(['/']);
  }

  userLogout() {
    localStorage.removeItem('user');
    this.route.navigate(['/']);
    this.product.cartData.emit([]);
  }

  searchProducts(query: KeyboardEvent) {
    const element = query.target as HTMLInputElement;
    if (element?.value) {
      this.product.searchProducts(element.value).subscribe((result) => {
        if (result.length > 5) {
          result.length = 5;
        }
        this.searchResult = result;
      });
    }
  }


  hideSearch() {
    this.searchResult=undefined;
  }

  submitSearch(val:string) {
    this.route.navigate([`search/${val}`])
  }

  redirectToDetails(id:string) {
    this.route.navigate(['/details/'+id])
  }

}

