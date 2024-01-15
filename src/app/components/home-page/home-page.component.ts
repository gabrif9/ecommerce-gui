import { Component, ElementRef, OnInit, QueryList, ViewChildren } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Product, ProductList } from 'src/app/module/product.module';
import { LoginService } from 'src/app/services/login.service';
import { OrdersService } from 'src/app/services/orders.service';
import { ProductManagementServiceService } from 'src/app/services/product-management-service.service';
import {
  MatDialog
} from '@angular/material/dialog';
import { AddNewProductDialogComponent } from '../add-new-product-dialog/add-new-product-dialog.component';
import {MatSnackBar} from '@angular/material/snack-bar';
import { NotificationService } from 'src/app/services/notification.service';

export interface DialogCategoriesData {
  categories: string[]
}

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  products?: ProductList[]
  productsBackup?: ProductList[]

  searchBar = new FormControl()

  categories: string[] = ["men's clothing", "jewelery", "electronics", "women's clothing", "kitchen"]
  selectedCategories = {
    "men's clothing": false,
    "jewelery": false,
    "electronics": false,
    "women's clothing": false,
    "kitchen": false
  }

  sessionStorageToken = false
  userRole: string = ''

  @ViewChildren("checkboxes") checkboxes?: QueryList<ElementRef>

  constructor(
    private productManagementService: ProductManagementServiceService,
    private router: Router,
    public loginService: LoginService,
    private orderService: OrdersService,
    private notificationService: NotificationService,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar,
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
    if(sessionStorage.getItem('userToken')) {
      this.sessionStorageToken = true
      this.userRole = sessionStorage.getItem('role')!
    }


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
    this.sessionStorageToken = false;
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
    const dialogRef = this.dialog.open(AddNewProductDialogComponent, {
      data: {categories: this.categories}
    })

    dialogRef.afterClosed().subscribe(result => {
      if(result != 'no') {
        this.productManagementService.addNewProduct(result)
        .subscribe({
          next: (response: any) => {
            //trigger the snackbar
            console.log(response)
            this.notificationService.notify('New product added', response.createdProduct._id)
            let snackbarRef = this._snackBar.open('New Product Added', 'Go To Details', {duration: 3000})
            snackbarRef.onAction().subscribe(() => {
              this.goToNewProductDetails(response.createdProduct._id)
            })
          },
          error: err => {
            console.log(err)
          }
        })
      }
    })
  }

  goToNewProductDetails(url: string){

  }
}
