import { Component, Input } from '@angular/core';
import { Product } from 'src/app/core/interfaces/product';

@Component({
  selector: 'app-product-details-card',
  templateUrl: './product-details-card.component.html',
  styleUrls: ['./product-details-card.component.scss'],
})
export class ProductDetailsCardComponent {
  @Input() product: Product;
  productQuantity: number = 1;

  increaseProductQuantity() {
    this.productQuantity++;
  }

  decreaseProductQuantity() {
    if (this.productQuantity > 1) this.productQuantity--;
  }

  get totalPrice() {
    return this.product.price * this.productQuantity;
  }

  get reviewText() {
    const reviewCount = this.product.rating.count;

    if (reviewCount === 0) return 'No reviews';
    else if (reviewCount === 1) return '1 review';
    else if (reviewCount > 1) {
      return `${reviewCount} reviews`;
    }
    return '';
  }
}
