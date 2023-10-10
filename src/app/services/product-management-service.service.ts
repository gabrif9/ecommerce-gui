import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../module/product.module';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductManagementServiceService {

  productSubject?: BehaviorSubject<Product[]>

  constructor(private http: HttpClient) { }


  getProducts() {
    var headers = new HttpHeaders()
      .set('content-type', 'application/json')
      .set('Access-Control-Allow-Origin', '*')
    this.http.get('http://localhost:3000/products').subscribe(item =>
      this.productSubject = new BehaviorSubject(item as Product[])
    )

  }
}
