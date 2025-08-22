import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import{Product}from '../models/product.model';
import { firstValueFrom } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ProductService {
  constructor(private http: HttpClient) {}

  getProducts(): Observable<{ Products: Product[]; totalProducts: number; searchedProducts: number}>{
  return this.http
      .get<{ Products: Product[]; totalProducts: number; searchedProducts: number }>(
        'http://localhost:8080/api/products/search',
        { withCredentials: true }
      )
  }

createProduct(payload: any): Promise<Product>{
return firstValueFrom (
  this.http .post<Product>('http://localhost:8080/api/products', payload, {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true,
        }))





}

        
}
