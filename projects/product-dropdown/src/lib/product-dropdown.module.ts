import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ProductDropdownComponent } from './product-dropdown.component';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    NgbDropdownModule
  ],
  declarations: [ProductDropdownComponent],
  exports: [ProductDropdownComponent]
})
export class ProductDropdownModule { }

export { SurescriptsProduct } from './product.model';
