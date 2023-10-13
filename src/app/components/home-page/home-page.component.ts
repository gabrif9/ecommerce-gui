import { Component, ElementRef, QueryList, ViewChildren } from '@angular/core';
import { Product, ProductList } from 'src/app/module/product.module';
import { ProductManagementServiceService } from 'src/app/services/product-management-service.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent {

  products?: ProductList[]
  productsBackup?: ProductList[]

  categories: string[] = ["men's clothing", "jewelery", "electronics", "women's clothing"]
  selectedCategories = {
    "men's clothing": false,
    "jewelery": false,
    "electronics": false,
    "women's clothing": false,
  }

  @ViewChildren("checkboxes") checkboxes?: QueryList<ElementRef>

  constructor(private productManagementService: ProductManagementServiceService) {
    this.productManagementService.getProducts().subscribe(item => {
      this.products = (item as Product).products
      this.productsBackup = this.products
    })
  }

  filterItems(category: string) {

    this.selectedCategories[category as keyof typeof this.selectedCategories] = !this.selectedCategories[category as keyof typeof this.selectedCategories]
    console.log(this.selectedCategories)


    var tmpProducts = this.productsBackup?.filter(item => {
      return this.selectedCategories[item.category as keyof typeof this.selectedCategories]
    })

    this.products = tmpProducts

    var atLeastOneChecked = false;
    this.checkboxes!.forEach((element) => {
      if(element.nativeElement.checked){
        atLeastOneChecked = true
      }
    })

    if(!atLeastOneChecked) {
      this.products = this.productsBackup
    }
  }
}
