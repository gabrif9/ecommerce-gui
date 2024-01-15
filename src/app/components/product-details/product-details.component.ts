import { identifierName } from '@angular/compiler';
import { Component, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Order } from 'src/app/module/order.module';
import { Product } from 'src/app/module/product.module';
import { OrdersService } from 'src/app/services/orders.service';
import { ProductManagementServiceService } from 'src/app/services/product-management-service.service';
import { SelectQuantityDialogComponent } from '../select-quantity-dialog/select-quantity-dialog.component';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent {

  productSelected?: Product

  orderService = inject(OrdersService)

  userRole: string = ''

  constructor(
    private productService: ProductManagementServiceService,
    route: ActivatedRoute,
    private router: Router,
    public dialog: MatDialog,
    ) {

    if(sessionStorage.getItem('userToken')) {
      this.userRole = sessionStorage.getItem('role')!
    }

    if(!!route.snapshot.paramMap.get('id')){
      productService.getProductDetail(route.snapshot.paramMap.get('id')!).subscribe((details: any) => {
        this.productSelected = details.product as Product
      })
    }
  }


  removeProduct(id: number){
    this.productService.removeProduct(id).subscribe({
      next: result => {
        console.log(result)
        this.router.navigate(['/homePage'])
      }
    })
  }

  addProductToCart(){
    // this.orderService.addProductToCartFromProductDetails(
    //   {product: this.productSelected}
    // )
    const dialogRef = this.dialog.open(SelectQuantityDialogComponent)

    dialogRef.afterClosed().subscribe(quantity => {
      if(quantity > 0) {
        //add this quantity to the product selected with the buy button
        let order: Order = {
          product: this.productSelected!,
          quantity: quantity
        }

        this.orderService.addProductToCart(order)
      }
    })
  }
}
