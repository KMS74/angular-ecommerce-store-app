import { Component, ElementRef, OnInit, TemplateRef } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { Product, ProductDataType } from 'src/app/types/product';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { count } from 'rxjs';
import { ToastService } from 'angular-toastify';

@Component({
  selector: 'app-admin-view',
  templateUrl: './admin-view.component.html',
  styleUrls: ['./admin-view.component.scss'],
})
export class AdminViewComponent implements OnInit {
  products: any[] = [];
  categories: string[] = [];
  productsPaginated: any[];

  page: number = 1;
  pageSize: number = 5;
  totalProducts: number;
  isLoading: boolean = false;
  isError: boolean = false;

  productData: ProductDataType = {
    title: '',
    price: '',
    description: '',
    category: '',
  };

  constructor(
    private productsService: ProductService,
    private modalService: NgbModal,
    private _toastService: ToastService
  ) {}
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

    this.productsService.getCategories().subscribe(
      (products) => {
        this.categories = products;
        this.isLoading = false;
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

  // open model to add new products
  openAddProductModel(content: TemplateRef<any>) {
    this.modalService.open(content);
  }

  resetProductDate() {
    this.productData = {
      title: '',
      price: '',
      description: '',
      category: '',
    };
  }
  onSubmitAddProduct() {
    const { title, category, description, price } = this.productData;
    if (
      title.length > 0 &&
      category.length > 0 &&
      description.length > 0 &&
      Number(price) > 0
    ) {
      this.productsService
        .createProduct({
          ...this.productData,
          image: `https://source.unsplash.com/collection/${Date.now()}/480x480`,
        })
        .subscribe(
          (product) => {
            console.log('Product created successfully:', product);
            // Handle success, such as showing a success message or redirecting
            this._toastService.success('Product created successfully');
            this.products.unshift({
              ...product,
              rating: {
                rate: 0,
                count: 0,
              },
            });
            this.refreshProducts();
          },
          (error) => {
            // Handle error, such as showing an error message
            console.error('Error creating product:', error);
            this._toastService.error('Something went wrong creating product');
          }
        );

      this.resetProductDate();
      this.modalService.dismissAll();
    }
  }
}
