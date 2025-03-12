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
export class HeaderComponent {
  menuType: string='default';
  sellerName: string = '';
  searchResult: undefined | product[];

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
          }
        }else{
          this.menuType='default'
        }
      }
    })
  }

  logout(){
    localStorage.removeItem('seller');
    this.route.navigate(['/']);
  }

  // searchProducts(query:KeyboardEvent) {
  //   if (query) {
  //     const element = query.target as HTMLInputElement;
  //     this.product.searchProducts(element.value).subscribe((result)=>{
  //     if (result.length > 5) {
  //       result.length = 5;
  //     }
  //     this.searchResult=result;
  //     })
  //   }
  // }

  searchProducts(query: KeyboardEvent) {
    const element = query.target as HTMLInputElement;
    if (element?.value) {
      this.product.searchProducts(element.value).subscribe((result) => {
        if (result.length > 5) {
          result.length = 5;  // Limita os resultados a 5
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
