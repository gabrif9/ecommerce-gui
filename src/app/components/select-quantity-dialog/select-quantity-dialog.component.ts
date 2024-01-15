import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-select-quantity-dialog',
  template: `

    <h1 mat-dialog-title>Select a Quantity</h1>
    <div mat-dialog-content>
      <p>Please select a quantity for the product choose</p>
      <mat-form-field class="w-full">
        <mat-label>Quantity</mat-label>
        <mat-select #select>
          <mat-option *ngFor="let quantity of [1, 2, 3, 4, 5, 6, 7, 8, 9]" [value]="quantity">{{quantity}}</mat-option>
        </mat-select>
    </mat-form-field>
    </div>

    <div class="flex justify-between px-3 pb-3">
      <button class="hover:bg-gray-300 py-1 px-3 rounded-lg " (click)="onClose()">Close</button>
      <button class="hover:bg-gray-300 py-1 px-3 rounded-lg " (click)="onQuantitySelected(select.value)">Ok</button>
    </div>
  `,
  styles: [
  ]
})
export class SelectQuantityDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<SelectQuantityDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  onClose() {
    this.dialogRef.close(0)
  }

  onQuantitySelected(quantity: number) {
    this.dialogRef.close(quantity)
  }
}
