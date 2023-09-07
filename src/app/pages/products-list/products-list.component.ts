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
  filteredProducts: CategoryProducts[] = [];
  private _listFilter = '';
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
        this.filteredProducts = this.products;
        this.isLoading = false;
      },
      (err) => {
        this.isError = true;
        this.isLoading = false;
        console.error(err);
      }
    );
  }

  get listFilter(): string {
    return this._listFilter;
  }
  set listFilter(value: string) {
    this._listFilter = value;
    this.filteredProducts = this.performFilter(value);
    console.log('filteredProducts: ');
    console.log(this.filteredProducts);
  }

  performFilter(filterBy: string) {
    filterBy = filterBy.toLocaleLowerCase();
    return this.products.map((product) => {
      let products = product.products;
      products = products.filter(
        (product) =>
          product.title.toLocaleLowerCase().includes(filterBy) ||
          product.category.toLocaleLowerCase().includes(filterBy) ||
          product.price.toString().includes(filterBy)
      );

      return {
        ...product,
        totalProducts: products.length,
        products,
      };
    });
  }

  get isNotFoundProducts() {
    return this.filteredProducts.every(
      (product) => product.totalProducts === 0
    );
  }
}
