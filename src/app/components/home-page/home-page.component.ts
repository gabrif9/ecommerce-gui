import { Component } from '@angular/core';
import { Product } from 'src/app/module/product.module';
import { ProductManagementServiceService } from 'src/app/services/product-management-service.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent {

  products?: Product[]

  constructor(private productManagementService: ProductManagementServiceService) {
    this.products = productManagementService.getProducts()
  }
}
