import { HttpClient, HttpHeaders } from '@angular/common/http';
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

  constructor(private productManagementService: ProductManagementServiceService, private http: HttpClient) {
    var headers = new HttpHeaders()
      .set('content-type', 'application/json')
      .set('Access-Control-Allow-Origin', '*')
    this.http.get('http://localhost:3000/products').subscribe(item => {
      this.products = (item as Product).products
      console.log(this.products)
    })
  }
}
