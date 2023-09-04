import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';
import { Product } from 'src/app/types/product';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss'],
})
export class ProductDetailsComponent implements OnInit {
  product: Product;
  isLoading: boolean = false;
  isError: boolean = false;
  productQuantity: number = 1;

  constructor(
    private productService: ProductService,
    private activatedRoute: ActivatedRoute
  ) {}
  ngOnInit(): void {
    this.isLoading = true;

    const productId = Number(
      this.activatedRoute.snapshot.paramMap.get('productId')
    );
    console.log(productId);

    if (productId) {
      this.productService.getProduct(productId).subscribe(
        (product) => {
          this.product = product;
          this.isLoading = false;
          console.log(this.product);
        },
        (err) => {
          this.isError = true;
          this.isLoading = false;
          console.log(err);
        }
      );
    }
  }

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
