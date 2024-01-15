import { identifierName } from '@angular/compiler';
import { Component } from '@angular/core';
import { ActivatedRoute, Route } from '@angular/router';
import { Product } from 'src/app/module/product.module';
import { ProductManagementServiceService } from 'src/app/services/product-management-service.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent {

  productSelected?: Product

  constructor(productService: ProductManagementServiceService, route: ActivatedRoute) {
    if(!!route.snapshot.paramMap.get('id')){
      productService.getProductDetail(route.snapshot.paramMap.get('id')!).subscribe((details: any) => {
        this.productSelected = details.product as Product
      })
    }
  }
}
