import { Component, ElementRef, OnInit, QueryList, ViewChildren } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Product, ProductList } from 'src/app/module/product.module';
import { LoginService } from 'src/app/services/login.service';
import { OrdersService } from 'src/app/services/orders.service';
import { ProductManagementServiceService } from 'src/app/services/product-management-service.service';
import {
  MatDialogRef,
  MatDialogClose,
  MatDialog
} from '@angular/material/dialog';
import { AddNewProductDialogComponent } from '../add-new-product-dialog/add-new-product-dialog.component';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  products?: ProductList[]
  productsBackup?: ProductList[]

  searchBar = new FormControl()

  categories: string[] = ["men's clothing", "jewelery", "electronics", "women's clothing"]
  selectedCategories = {
    "men's clothing": false,
    "jewelery": false,
    "electronics": false,
    "women's clothing": false,
  }

  @ViewChildren("checkboxes") checkboxes?: QueryList<ElementRef>

  constructor(
    private productManagementService: ProductManagementServiceService,
    private router: Router,
    private loginService: LoginService,
    private orderService: OrdersService,
    public dialog: MatDialog
    ) {
    this.productManagementService.getProducts().subscribe(item => {
      this.products = (item as Product).products
      this.productsBackup = this.products
      // console.log(this.products)
    })
  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.searchBar.valueChanges.subscribe((ele: string) => {
      if (ele.length > 1) {
        this.products = this.productsBackup?.filter(item => {
          return item.name.toUpperCase().includes(ele.toUpperCase())
        })
      } else {
        this.products = this.productsBackup
      }
    })
  }


  /**
   *This function filter items on the homepage based on the selected categories
   * @param category the selected category
   */
  filterItems(category: string) {

    this.selectedCategories[category as keyof typeof this.selectedCategories] = !this.selectedCategories[category as keyof typeof this.selectedCategories]

    var tmpProducts = this.productsBackup?.filter(item => {
      return this.selectedCategories[item.category as keyof typeof this.selectedCategories]
    })

    this.products = tmpProducts

    var atLeastOneChecked = false;
    this.checkboxes!.forEach((element) => {
      if (element.nativeElement.checked) {
        atLeastOneChecked = true
      }
    })

    if (!atLeastOneChecked) {
      this.products = this.productsBackup
    }
  }

  navigateToProduct(id: number) {
    this.router.navigate(['/productDetails', id.toString()])
  }

  logout() {
    this.loginService.logout()
  }

  //when the user press "buy" button
  addProductToCart(productToAdd: ProductList) {
    this.orderService.addProductToCart(productToAdd)
  }

  sendProductToCart(){
      this.orderService.sendProductToCart()
  }


  //TODO implements this function that open a dialog to insert a new product
  openAddNewProductDialog(){
    const dialogRef = this.dialog.open(AddNewProductDialogComponent)

    dialogRef.afterClosed().subscribe(result => {
      if(result != 'no') {
        this.productManagementService.addNewProduct(result)
        .subscribe({
          next: response => {
            console.log(response)
          },
          error: err => {
            console.log(err)
          }
        })
      }
    })
  }
}
