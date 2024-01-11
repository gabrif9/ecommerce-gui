import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../module/product.module';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductManagementServiceService {

  productSubject?: BehaviorSubject<Product[]>

  token = sessionStorage.getItem('userToken')
  headers = new HttpHeaders().set('Authorization', "Bearer " + this.token!)

  constructor(private http: HttpClient) { }


  getProducts() {
    return this.http.get('http://localhost:3000/products')
  }

  getProductDetail(id: string) {
    return this.http.get('http://localhost:3000/products/' + id)
  }

  addNewProduct(productDetails: any) {
    return this.http.post('http://localhost:3000/products/', productDetails, {headers: this.headers})
  }
}
