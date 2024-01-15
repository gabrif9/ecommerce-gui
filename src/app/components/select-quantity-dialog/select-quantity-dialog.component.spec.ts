import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectQuantityDialogComponent } from './select-quantity-dialog.component';

describe('SelectQuantityDialogComponent', () => {
  let component: SelectQuantityDialogComponent;
  let fixture: ComponentFixture<SelectQuantityDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SelectQuantityDialogComponent]
    });
    fixture = TestBed.createComponent(SelectQuantityDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
