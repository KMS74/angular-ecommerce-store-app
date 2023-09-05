import { Component, ElementRef, OnInit, TemplateRef } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { Product, ProductDataType } from 'src/app/types/product';

import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { count } from 'rxjs';
import { ToastService } from 'angular-toastify';

@Component({
  selector: 'app-admin-view',
  templateUrl: './admin-view.component.html',
  styleUrls: ['./admin-view.component.scss'],
})
export class AdminViewComponent implements OnInit {
  products: Product[] = [];
  categories: string[] = [];
  productsPaginated: Product[];

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

  closeResult = '';
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
    this.productsPaginated = this.products.slice(
      (this.page - 1) * this.pageSize,
      (this.page - 1) * this.pageSize + this.pageSize
    );
  }

  // open model to add new products
  openAddProductModel(content: TemplateRef<any>) {
    this.modalService.open(content);
  }

  openConifirmationDeleteModel(
    content: TemplateRef<any>,
    productId: number
  ): void {
    this.modalService
      .open(content, { ariaLabelledBy: 'modal-basic-title' })
      .result.then(
        (result) => {
          this.closeResult = `Closed with: ${result}`;
          if (result === 'yes') {
            console.log('DELETED', productId);
            console.log(result);
            this.deleteProduct(productId);
          }
        },
        (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
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

  deleteProduct(productId: number) {
    this.productsService.deleteProduct(productId).subscribe(
      (deletedProduct) => {
        this._toastService.success('Product deleted successfully');
        console.log(this.products);

        console.log(
          this.products.filter((product) => product.id !== deletedProduct.id)
        );
        console.log(this.products);
        this.products = this.products.filter(
          (product) => product.id !== deletedProduct.id
        );
        this.refreshProducts();
      },
      (error) => {
        console.error(error);
        this._toastService.error(
          'Something went wrong while deleting the product'
        );
      }
    );
  }
}
