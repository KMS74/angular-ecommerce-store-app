import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from 'src/app/core/services/product.service';
import { Product } from 'src/app/core/interfaces/product';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss'],
})
export class ProductDetailsComponent implements OnInit {
  product: Product;
  isLoading: boolean = false;
  isError: boolean = false;

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

 
}
