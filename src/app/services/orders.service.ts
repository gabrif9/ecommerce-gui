import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../module/product.module';
import { BehaviorSubject } from 'rxjs';
import { Order } from '../module/order.module';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  tmpProductToAddToCart: Order[] = new Array

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

  addNewOrder(order: Order) {
    return this.http.post('http://localhost:3000/orders', {productId: order.product._id, quantity: order.quantity},{headers: this.headers})
  }

  sendProductToCart() {
    console.log(this.tmpProductToAddToCart, 'nuovi prodotti aggiunti al carrello')
    this.productsToCartSubject.next(this.tmpProductToAddToCart)
  }

  //save the product in a tmp array
  addProductToCart(product: Order) {
    this.tmpProductToAddToCart.push(product)
  }
}
