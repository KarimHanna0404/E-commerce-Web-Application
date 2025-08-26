import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Product {
  id: number;
  name: string;
  price: number;
}

export interface OrderItem {
  productDto: Product;
  quantity: number;
  totalAmount: number;
}

export interface Order {
  id: number;
  identifier: string;
  totalAmount: number;
  orderDate: string;
  orderItems: OrderItem[];
  itemDetails?: string[];
}

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private apiUrl = 'http://localhost:8080/api/orders'; 

  constructor(private http: HttpClient) {}

  getOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(this.apiUrl, { withCredentials: true });
  }
}
