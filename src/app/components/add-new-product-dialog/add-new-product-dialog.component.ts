import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {
  MatDialogRef,
} from '@angular/material/dialog';

@Component({
  selector: 'app-add-new-product-dialog',
  templateUrl: './add-new-product-dialog.component.html',
  styleUrls: ['./add-new-product-dialog.component.css']
})
export class AddNewProductDialogComponent {

  productDetailsFormGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    price: new FormControl('', Validators.required),
    category: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    image: new FormControl('', Validators.required),
  })

  constructor(
    public dialogRef: MatDialogRef<AddNewProductDialogComponent>,
  ) {}

  onCloseClick(): void {
    this.dialogRef.close('no');
  }

  onDoneClick(): void {
    let productDetails = {
      name: this.productDetailsFormGroup.controls.name.value,
      price: this.productDetailsFormGroup.controls.price.value,
      category: this.productDetailsFormGroup.controls.category.value,
      description: this.productDetailsFormGroup.controls.description.value,
      image: this.productDetailsFormGroup.controls.image.value,
    }

    this.dialogRef.close(productDetails)
  }
}
