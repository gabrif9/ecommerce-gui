import { Component, OnInit, inject } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter, first } from 'rxjs';
import { Order } from 'src/app/module/order.module';
import { LoginService } from 'src/app/services/login.service';
import { OrdersService } from 'src/app/services/orders.service';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit{

  productsToOrder: Order[] = new Array

  refreshEvent = false;

  loginService = inject(LoginService)

  constructor(private orderService: OrdersService, private router: Router, private _snackbar: MatSnackBar){
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
          let tmp = tmpProductsArray as Order[]
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
          let tmp = tmpProductsArray as Order[]
          this.productsToOrder = tmp
        }
        else if (localStorage.getItem('product') && productToOrder.length != 0){
          //get the old item from the localStorage
          let tmpProductsArray = JSON.parse(localStorage.getItem('product')!)
          let tmp = tmpProductsArray as Order[]
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

  order(){
    if(this.loginService.getAuthenticated()) {
      for(let order of this.productsToOrder) {
        this.orderService.addNewOrder(order).subscribe({
          next: result => {
            localStorage.removeItem('product')
            const snackbarRef = this._snackbar.open('New Order Created', 'Go to orders')
            snackbarRef.onAction().subscribe(() => {
              this.router.navigate(['/orders'])
            })
          },
          error: err => {
            alert('You are not logged in')
            this.router.navigate(['login'])
          }
        })
      }
    }
  }
}
