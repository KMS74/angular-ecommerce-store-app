import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { Product } from 'src/app/types/product';

@Component({
  selector: 'app-admin-view',
  templateUrl: './admin-view.component.html',
  styleUrls: ['./admin-view.component.scss'],
})
export class AdminViewComponent implements OnInit {
  products: Product[] = [];
  productsPaginated: Product[];

  page: number = 1;
  pageSize: number = 5;
  totalProducts: number;
  isLoading: boolean = false;
  isError: boolean = false;

  constructor(private productsService: ProductService) {}
  ngOnInit(): void {
    this.isLoading = true;
    this.productsService.getProducts().subscribe(
      (products) => {
        this.products = products;
        this.totalProducts = products.length;
        this.isLoading = false;
        this.refreshProducts();
      },
      (err) => {
        this.isError = true;
        this.isLoading = false;
        console.error(err);
      }
    );
  }

  refreshProducts() {
    this.productsPaginated = this.products
      .map((product, i) => ({
        ...product,
        id: i + 1,
      }))
      .slice(
        (this.page - 1) * this.pageSize,
        (this.page - 1) * this.pageSize + this.pageSize
      );
  }
}
