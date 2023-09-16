import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { StarRatingModule } from 'angular-star-rating';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { ProductsListComponent } from './pages/products-list/products-list.component';
import { ProductItemComponent } from './components/product-item/product-item.component';
import { ProductDetailsComponent } from './pages/product-details/product-details.component';
import { ProductDetailsCardComponent } from './components/product-details-card/product-details-card.component';

@NgModule({
  declarations: [
    ProductsListComponent,
    ProductItemComponent,
    ProductDetailsComponent,
    ProductDetailsCardComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    TranslateModule,
    RouterModule,
    StarRatingModule.forRoot(),
  ],
})
export class ProductsModule {}
