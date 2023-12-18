import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter, first } from 'rxjs';
import { ProductList } from 'src/app/module/product.module';
import { OrdersService } from 'src/app/services/orders.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit{

  productsToOrder: ProductList[] = new Array

  refreshEvent = false;

  constructor(private orderService: OrdersService, private router: Router){
    router.events
    .pipe(filter((rs): rs is NavigationEnd => rs instanceof NavigationEnd))
    .subscribe(event => {
      if (
        event.id === 1 &&
        event.url === event.urlAfterRedirects
      ) {
        this.refreshEvent = true
        //handle the localStorage retrieve data
        if(localStorage.getItem('product') != null) {
          //get data from local storage and save it to the productsToOrderArray
          let tmpProductsArray = JSON.parse(localStorage.getItem('product')!)
          let tmp = tmpProductsArray as ProductList[]
          this.productsToOrder = tmp
        }
      }
    })
  }

  ngOnInit(): void {
    //this subscribe take only the last value of my BehaviorSubject that refer to the entire list of element to order
    this.orderService.productsToCartSubject
    .pipe(first())
    .subscribe(productToOrder => {
      if(!this.refreshEvent){
        if(localStorage.getItem('product') && productToOrder.length === 0) {
          let tmpProductsArray = JSON.parse(localStorage.getItem('product')!)
          let tmp = tmpProductsArray as ProductList[]
          this.productsToOrder = tmp
        }
        else if (localStorage.getItem('product') && productToOrder.length != 0){
          //get the old item from the localStorage
          let tmpProductsArray = JSON.parse(localStorage.getItem('product')!)
          let tmp = tmpProductsArray as ProductList[]
          this.productsToOrder = tmp

          //remove the old item from the local storage
          localStorage.removeItem('product')
          this.productsToOrder.push(...productToOrder)
          localStorage.setItem('product', JSON.stringify(this.productsToOrder))
        } else {
          localStorage.setItem('product', JSON.stringify(productToOrder))
          this.productsToOrder = productToOrder
        }
      }
    })
  }
}
