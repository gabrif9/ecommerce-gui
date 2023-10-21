import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  token = localStorage.getItem('userToken')
  email = localStorage.getItem('userEmail')
  headers = new HttpHeaders().set('Authorization', "Bearer " + this.token!)

  constructor(private http: HttpClient) { }

  getOrders() {


    return this.http.get('http://localhost:3000/orders', { headers: this.headers })
  }

  deleteOrder(id: string) {
    return this.http.delete(`http://localhost:3000/orders/${id}`, { headers: this.headers })
  }
}
