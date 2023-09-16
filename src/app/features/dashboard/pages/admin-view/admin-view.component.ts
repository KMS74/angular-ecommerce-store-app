import { TranslateService } from '@ngx-translate/core';
import { Component, OnInit, TemplateRef } from '@angular/core';

import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastService } from 'angular-toastify';
import { Product, ProductDataType } from 'src/app/core/interfaces/product';
import { ProductService } from 'src/app/core/services/product.service';

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
    private _toastService: ToastService,
    private transalte: TranslateService
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

  // for paginating products data
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

  // open model to delete product
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
            this.deleteProduct(productId);
          }
        },
        (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );
  }

  openEditProductModel(content: TemplateRef<any>, productId: number) {
    this.modalService.open(content).result.then(
      (result) => {
        this.closeResult = `Closed with: ${result}`;
        if (result === 'yes') {
          this.updateProduct(productId, this.productData);
        }
      },
      (reason) => {
        console.log(reason);
        this.resetProductDate();
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      }
    );
    const product = this.products.find((product) => product.id === productId);
    if (product) {
      this.productData = {
        title: product.title,
        price: product.price,
        category: product.category,
        description: product.description,
      };
    }
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
            // Handle success, such as showing a success message or redirecting
            this._toastService.success(
              this.transalte.instant('CREATE_PRODUCT_SUCCESS')
            );
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
            this._toastService.error(
              this.transalte.instant('CREATE_PRODUCT_FAIL')
            );
          }
        );

      this.resetProductDate();
      this.modalService.dismissAll();
    }
  }

  deleteProduct(productId: number) {
    this.productsService.deleteProduct(productId).subscribe(
      (deletedProduct) => {
        this.products = this.products.filter(
          (product) => product.id !== productId
        );
        this.refreshProducts();
        this._toastService.success(
          this.transalte.instant('DELETE_PRODUCT_SUCCESS')
        );
      },
      (error) => {
        console.error(error);
        this._toastService.error(this.transalte.instant('DELTE_PRODUCT_FAIL'));
      }
    );
  }

  updateProduct(productId: number, proctuctData: ProductDataType) {
    this.productsService.updateProduct(proctuctData, productId).subscribe(
      (updatedProduct) => {
        this.products = this.products.map((product) =>
          product.id === updatedProduct.id
            ? {
                ...updatedProduct,
                rating: product.rating,
                image: product.image,
              }
            : product
        );
        this.resetProductDate();
        this.refreshProducts();
        this._toastService.success(
          this.transalte.instant('UPDATE_PRODUCT_SUCCESS')
        );
      },
      (error) => {
        console.error(error);
        this._toastService.error(this.transalte.instant('UPDATE_PRODUCT_FAIL'));
      }
    );
  }
}
