import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '../types/product';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  // TODO save this in .env variable
  private BASE_URL = 'https://fakestoreapi.com';

  constructor(private _http: HttpClient) {}

  // Getting all categories from fake store API
  getProducts(): Observable<Product[]> {
    return this._http.get<Product[]>(`${this.BASE_URL}/products`);
  }

  // Getting all produts in a specfic category from fake store API
  getCategoryProducts(categoryName: string): Observable<Product[]> {
    return this._http.get<Product[]>(
      `${this.BASE_URL}/products/category/${categoryName}`
    );
  }

  // Getting specific product by id
  getProduct(id: number): Observable<Product> {
    return this._http.get<Product>(`${this.BASE_URL}/products/${id}`);
  }

  // Getting all categories from fake store APIs
  getCategories(): Observable<string[]> {
    return this._http.get<string[]>(`${this.BASE_URL}/products/categories`);
  }
}

[
  {
    categoryName: 'Product',
    prooducts: [],
  },

  {
    categoryName: 'Product',
    prooducts: [],
  },
];