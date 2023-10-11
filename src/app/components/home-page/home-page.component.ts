import { Component } from '@angular/core';
import { Product, ProductList } from 'src/app/module/product.module';
import { ProductManagementServiceService } from 'src/app/services/product-management-service.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent {

  products?: ProductList[]

  constructor(private productManagementService: ProductManagementServiceService) {
    this.productManagementService.getProducts().subscribe(item => {
      this.products = (item as Product).products
      console.log(this.products)
    })
  }
}
