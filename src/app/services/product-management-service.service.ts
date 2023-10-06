import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../module/product.module';

@Injectable({
  providedIn: 'root'
})
export class ProductManagementServiceService {

  constructor(private http: HttpClient) { }


  getProducts(): Product[]{
    this.http.get('localhost:3000/products/').subscribe(item => {
      return item
    })
  }

}
