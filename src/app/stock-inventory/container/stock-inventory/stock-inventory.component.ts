import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormArray } from '@angular/forms';
import { Product } from '../../models/product.interface';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'stock-inventory',
  styleUrls: ['./stock-inventory.component.scss'],
  template: `
<div class="stock-inventory">
  <form [formGroup]="form" (ngSubmit)="onSubmit()">
    <stock-branch [parent]="form">
    </stock-branch>
    <stock-selector [parent]="form" [products]="products" (added)="addStock($event)">
    </stock-selector>
    <stock-products [parent]="form" (removed)="removeStock($event)">
    </stock-products>
    <div class="stock-inventory__buttons">
      <button type="submit">Order stock</button>
    </div>
  </form>
  <pre> {{form.value | json }}</pre>
</div>
`

})
export class StockInventoryComponent implements OnInit {
  products: Product[] = [
    { id: 1, price: 2800, name: 'MacBook Pro' },
    { id: 2, price: 50, name: 'USB-C Adaptor' },
    { id: 3, price: 400, name: 'iPod' },
    { id: 4, price: 900, name: 'iPhone' },
    { id: 5, price: 600, name: 'Apple Watch' },
  ];

  form = new FormGroup({
    store: new FormGroup({
      branch: new FormControl(),
      code: new FormControl()
    }),
    selector: this.createStock({}),
    stock: new FormArray([
      this.createStock({ product_id: 1, quantity: 10}),
      this.createStock({ product_id: 3, quantity: 50})
    ])
  });


  constructor() { }

  ngOnInit(): void { }

  onSubmit() {
    console.log(this.form.value);
  }

  createStock(stock) {
    return new FormGroup({
      product_id: new FormControl(stock.product_id || ''),
      quantity: new FormControl(stock.quantity || 10)
    });
  }
  addStock(stock) {
    const control = this.form.get('stock') as FormArray;
    control.push(this.createStock(stock));
  }

  removeStock({group, index}: {group: FormGroup, index: number }) {
    // console.log(group, index);
    const control = this.form.get('stock') as FormArray;
    control.removeAt(index);
  }
}
