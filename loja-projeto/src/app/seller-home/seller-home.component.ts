import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { product } from '../data-types';
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-seller-home',
  standalone: false,
  templateUrl: './seller-home.component.html',
  styleUrl: './seller-home.component.css'
})
export class SellerHomeComponent {
  productList:undefined | product[]
  productMessage:undefined | string;

  deleteIcon = faTrash;
  editIcon = faEdit;


  constructor(private product:ProductService) { }

  ngOnInit(): void {
    this.list();
  }

  deleteProduct(id:string){
    this.product.deleteProduct(id).subscribe((result)=>{
      if(result){
        this.productMessage="PRODUTO DELETADO COM SUCESSO!";
        this.list();
      }
    })
    setTimeout(()=>{
      this.productMessage=undefined
    }, 3000);
  }

  list(){
    this.product.productList().subscribe((result)=>{
      if(result){
        this.productList=result
      }
    })
  }
}
