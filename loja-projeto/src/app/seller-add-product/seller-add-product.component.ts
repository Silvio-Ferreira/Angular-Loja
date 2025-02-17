import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { product } from '../data-types';

@Component({
  selector: 'app-seller-add-product',
  standalone: false,
  templateUrl: './seller-add-product.component.html',
  styleUrl: './seller-add-product.component.css'
})
export class SellerAddProductComponent {
  addProductMessage: string | undefined;

  constructor(private product:ProductService){ }

  ngOninit():void {

  }

  submit(data:product){
    this.product.addProduct(data).subscribe((result)=>{
      if(result){
        this.addProductMessage = "Produto cadastrado com sucesso!";
      }
      setTimeout(()=>(this.addProductMessage=undefined),3000);

    });
  }
}
