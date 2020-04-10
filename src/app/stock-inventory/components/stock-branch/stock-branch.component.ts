import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'stock-branch',
  styleUrls: ['./stock-branch.component.scss'],
  template: `
  <div [formGroup]="parent">
    <div class="form-group" formGroupName="store">
        <input type="text" placeholder="Branch ID" formControlName="branch">
        <input type="text" placeholder="Manager Code" formControlName="code">
    </div>
  </div>
`
})
export class StockBranchComponent implements OnInit {
  @Input() parent: FormGroup;
  constructor() { }

  ngOnInit(): void { }
}
