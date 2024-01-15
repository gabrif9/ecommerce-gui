import { Component } from '@angular/core';
import { Order } from 'src/app/module/order.module';
import { OrdersService } from 'src/app/services/orders.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent {

  //the list of orders
  orders?: Order[]

  constructor(private ordersService: OrdersService){
    ordersService.getOrders().subscribe((res: any) => {
      this.orders = res.orders
    })
  }

  addNewOrder() {
    
  }

  deleteOrder(id: string){
    this.ordersService.deleteOrder(id).subscribe({
      next: (res) => {
        console.log('Order deleted', res)
        window.location.reload()
      },
      error: (err) => {
        console.log(err)
      }
    })
  }
}
