import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { Product, CategoryProducts } from 'src/app/types/product';
import * as Aos from 'aos';

@Component({
  selector: 'app-user-view',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss'],
})
export class ProductsListComponent implements OnInit {
  private categories: string[] = [];
  products: CategoryProducts[] = [];
  isLoading: boolean = false;
  isError: boolean = false;

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    // initialize AOS
    Aos.init();

    this.isLoading = true;
    this.productService.getCategories().subscribe(
      (categories) => {
        this.categories = categories;

        this.categories.forEach((category) => {
          this.productService
            .getCategoryProducts(category)
            .subscribe((products) => {
              this.products.push({
                categoryName: category,
                totalProducts: products.length,
                products,
              });
            });
        });
        console.log(this.products);
        this.isLoading = false;
      },
      (err) => {
        this.isError = true;
        this.isLoading = false;
        console.error(err);
      }
    );
  }
}
