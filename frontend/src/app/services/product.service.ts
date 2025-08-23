import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, firstValueFrom } from 'rxjs';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  constructor(private http: HttpClient) {}

  getProducts(): Observable<{ Products: Product[]; totalProducts: number; searchedProducts: number }> {
    return this.http.get<{ Products: Product[]; totalProducts: number; searchedProducts: number }>(
      'http://localhost:8080/api/products/search',
      { withCredentials: true }
    );
  }

  getProductById(id: number): Observable<Product> {
    return this.http.get<Product>(`http://localhost:8080/api/products/${id}`, {
      withCredentials: true,
    });
  }

  createProduct(payload: Product): Promise<Product> {
    return firstValueFrom(
      this.http.post<Product>('http://localhost:8080/api/products', payload, {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true,
      })
    );
  }

  updateProduct(id: number, product: Product): Promise<Product> {
    return firstValueFrom(
      this.http.put<Product>(`http://localhost:8080/api/products/${id}`, product, {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true,
      })
    );
  }
}
