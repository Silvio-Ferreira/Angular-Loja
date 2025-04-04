import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../services/product.service';
import { product } from '../data-types';

@Component({
  selector: 'app-seller-update-product',
  standalone: false,
  templateUrl: './seller-update-product.component.html',
  styleUrl: './seller-update-product.component.css'
})
export class SellerUpdateProductComponent {
  constructor (private route : ActivatedRoute, private product:ProductService, private router:Router) { }
  productData:undefined | product;
  productMessage:undefined | string;

  ngOnInit(): void {
    let productId = this.route.snapshot.paramMap.get('id');
    productId && this.product.getProduct(productId).subscribe((data)=>{
      this.productData = data;
    })
  }

  submit(data:product) {
    if(this.productData){
      data.id = this.productData.id;
    }

    this.product.updateProduct(data).subscribe((result)=>{
      if(result){
        this.productMessage = "Produto atualizado com sucesso!";
      }
    });

    setTimeout(() => {
      this.productMessage = undefined;
    }, 3000);
    setTimeout(() => {
      this.router.navigate(['/seller-home']);
    }, 3010);
  }
}
