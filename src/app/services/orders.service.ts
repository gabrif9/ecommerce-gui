import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ProductList } from '../module/product.module';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  tmpProductToAddToCart: ProductList[] = new Array

  productsToCartSubject: BehaviorSubject<any> = new BehaviorSubject('')

  token = sessionStorage.getItem('userToken')
  email = sessionStorage.getItem('userEmail')
  headers = new HttpHeaders().set('Authorization', "Bearer " + this.token!)

  constructor(private http: HttpClient) { }

  getOrders() {
    return this.http.get('http://localhost:3000/orders', { headers: this.headers })
  }

  deleteOrder(id: string) {
    return this.http.delete(`http://localhost:3000/orders/${id}`, { headers: this.headers })
  }

  sendProductToCart() {
    console.log(this.tmpProductToAddToCart, 'nuovi prodotti aggiunti al carrello')
    this.productsToCartSubject.next(this.tmpProductToAddToCart)
  }

  //save the product in a tmp array
  addProductToCart(product: ProductList) {
    this.tmpProductToAddToCart.push(product)
  }
}
