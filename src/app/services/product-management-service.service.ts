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
    return this.http.get('http://localhost:3000/products')
  }
}
