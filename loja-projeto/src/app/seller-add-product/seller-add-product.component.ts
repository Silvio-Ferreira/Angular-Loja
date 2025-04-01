import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { product } from '../data-types';
import { Router } from '@angular/router';

@Component({
  selector: 'app-seller-add-product',
  standalone: false,
  templateUrl: './seller-add-product.component.html',
  styleUrl: './seller-add-product.component.css'
})
export class SellerAddProductComponent {
  addProductMessage: string | undefined;

  constructor(private product:ProductService, private router:Router){ }

  ngOninit():void {

  }

  submit(data:product){
    this.product.addProduct(data).subscribe((result)=>{
      if(result){
        this.addProductMessage = "Produto cadastrado com sucesso!";
      }
      setTimeout(()=>(this.addProductMessage=undefined),3000);
      setTimeout(() => {
        this.router.navigate(['/seller-home']);
      }, 3010);


    });
  }
}
