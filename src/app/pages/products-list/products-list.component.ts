import { Component, OnDestroy, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { CategoryProducts } from 'src/app/types/product';
import * as Aos from 'aos';
import { Subscription, forkJoin } from 'rxjs';

@Component({
  selector: 'app-user-view',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss'],
})
export class ProductsListComponent implements OnInit, OnDestroy {
  private subscriptions: Subscription[] = [];

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
    const categoriesSubscription = this.productService
      .getCategories()
      .subscribe({
        next: (categories) => {
          this.categories = categories;
          // console.log(categories);

          // an array of observables
          const categoryProductRequests = this.categories.map((category) =>
            this.productService.getCategoryProducts(category)
          );

          // the forkJoin operator is used to combine multiple observables and wait for all of them
          // to complete before emitting a single result.
          const productsSubscription = forkJoin(
            categoryProductRequests
          ).subscribe((results) => {
            // console.log(results);
            this.products = results.map((products, index) => ({
              categoryName: this.categories[index],
              totalProducts: products.length,
              products,
            }));

            // console.log(this.products);

            this.filteredProducts = this.products;
            this.isLoading = false;
          });

          this.subscriptions.push(productsSubscription);
        },
        error: (err) => {
          this.isError = true;
          this.isLoading = false;
          console.error(err);
        },
      });

    this.subscriptions.push(categoriesSubscription);
  }

  get listFilter(): string {
    return this._listFilter;
  }
  set listFilter(value: string) {
    this._listFilter = value;
    this.filteredProducts = this.performFilter(value);
    // console.log('filteredProducts: ');
    // console.log(this.filteredProducts);
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

      const filteredProducts: CategoryProducts = {
        ...product,
        totalProducts: products.length,
        products,
      };

      return filteredProducts;
    });
  }

  get isNotFoundProducts() {
    return this.filteredProducts.every(
      (product) => product.totalProducts === 0
    );
  }

  ngOnDestroy(): void {
    // unsubscribe from all subscribtions
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }
}
