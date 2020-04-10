import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormArray } from '@angular/forms';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'stock-products',
  styleUrls: ['./stock-products.component.scss'],
  template: `
  <div class="stock-product" [formGroup]="parent">
      <div formArrayName="stock">
        <div
          *ngFor="let item of stocks; let i = index;">
          <div class="stock-product__content" [formGroupName]="i">
            <div class="stock-product__name">
              {{ item.value.product_id }}
            </div>
            <input
              type="number"
              step="10"
              min="10"
              max="1000"
              formControlName="quantity">
            <button type="button">
              Remove
            </button>
          </div>
        </div>
      </div>
    </div>
`

})
export class StockProductsComponent implements OnInit {
  @Input() parent: FormGroup;
  constructor() { }

  ngOnInit(): void { }

  get stocks() {
    return (this.parent.get('stock') as FormArray).controls;
  }
}