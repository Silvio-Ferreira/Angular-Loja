import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { product } from '../data-types';
import { ProductService } from '../services/product.service';


@Component({
  selector: 'app-search',
  standalone: false,
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent implements OnInit {
  searchResult:undefined | product[];

  constructor (private activeRoute:ActivatedRoute, private product:ProductService) { }

  // ngOnInit(): void {
  //   let query = this.activeRoute.snapshot.paramMap.get('query');
  //   query && this.product.searchProducts(query).subscribe((result)=>{
  //     this.searchResult=result;
  //   })
  // }

  ngOnInit(): void {
    let query = this.activeRoute.snapshot.paramMap.get('query');
    if (query) {
      this.product.searchProducts(query).subscribe((result) => {
        this.searchResult = result;
      });
    }
  }

}
