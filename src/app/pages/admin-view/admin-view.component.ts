import { TranslateService } from '@ngx-translate/core';
import { Component, OnDestroy, OnInit, TemplateRef } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { Product, ProductDataType } from 'src/app/types/product';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastService } from 'angular-toastify';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-admin-view',
  templateUrl: './admin-view.component.html',
  styleUrls: ['./admin-view.component.scss'],
})
export class AdminViewComponent implements OnInit, OnDestroy {
  private subscriptions: Subscription[] = [];
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
    const productsSubscribtion = this.productsService.getProducts().subscribe({
      next: (products) => {
        this.products = products;
        this.totalProducts = products.length;
        this.isLoading = false;
        this.refreshProducts();
      },
      error: (err) => {
        this.isError = true;
        this.isLoading = false;
        console.error(err);
      },
      complete: () => {
        this.isLoading = false;
      },
    });

    this.subscriptions.push(productsSubscribtion);

    const categoriesSubscribtion = this.productsService
      .getCategories()
      .subscribe({
        next: (categories) => {
          this.categories = categories;
          this.isLoading = false;
        },
        error: (err) => {
          this.isError = true;
          this.isLoading = false;
          console.error(err);
        },
        complete: () => {
          this.isLoading = false;
        },
      });

    this.subscriptions.push(categoriesSubscribtion);
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
      const submitedProductSub = this.productsService
        .createProduct({
          ...this.productData,
          image: `https://source.unsplash.com/collection/${Date.now()}/480x480`,
        })
        .subscribe({
          next: (product) => {
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
          error: (err) => {
            // Handle error, such as showing an error message
            console.error('Error creating product:', err);
            this._toastService.error(
              this.transalte.instant('CREATE_PRODUCT_FAIL')
            );
          },
        });

      this.subscriptions.push(submitedProductSub);
      this.resetProductDate();
      this.modalService.dismissAll();
    }
  }

  deleteProduct(productId: number) {
    const deletedProductSub = this.productsService
      .deleteProduct(productId)
      .subscribe({
        next: (deletedProduct) => {
          this.products = this.products.filter(
            (product) => product.id !== deletedProduct.id
          );
          this.refreshProducts();
          this._toastService.success(
            this.transalte.instant('DELETE_PRODUCT_SUCCESS')
          );
        },
        error: (error) => {
          console.error(error);
          this._toastService.error(
            this.transalte.instant('DELTE_PRODUCT_FAIL')
          );
        },
      });

    this.subscriptions.push(deletedProductSub);
  }

  updateProduct(productId: number, proctuctData: ProductDataType) {
    const updatedProductSub = this.productsService
      .updateProduct(proctuctData, productId)
      .subscribe({
        next: (updatedProduct) => {
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
        error: (error) => {
          console.error(error);
          this._toastService.error(
            this.transalte.instant('UPDATE_PRODUCT_FAIL')
          );
        },
      });
    this.subscriptions.push(updatedProductSub);
  }

  ngOnDestroy(): void {
    // unsubscribe from all subscribtions
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }
}
