import { Component, OnInit, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';

interface Product {
  id: number;
  name: string;
  imageUrl: string;
  description: string;
  price: number;
  code: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  standalone: false,
})
export class HomepageComponent implements OnInit {
  private router = inject(Router);
  totalProducts = 0;
  searchedProducts: number = 0;
  products: Product[] = [];
  searchText: string = '';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.getAllProductsCount();
    this.searchProducts();
  }

  onSearchProducts(_: any) {
    this.searchProducts();
  }

  getAllProductsCount() {
    this.http
      .get<number>(`http://localhost:8080/api/products/count`, {
        withCredentials: true,
      })
      .subscribe((data) => {
        this.totalProducts = data;
      });
  }

  searchProducts() {
    let params: HttpParams = new HttpParams();
    if (this.searchText) {
      params = params.set('query', this.searchText);
    }
    this.http
      .get<Product[]>(`http://localhost:8080/api/products/search`, {
        params,
        withCredentials: true,
      })
      .subscribe((data) => {
        this.products = data;
        this.searchedProducts = data.length;
      });
  }

  onEdit(id: number): void {
    this.router.navigate(['/products', id, 'edit']);
  }

  deleteProduct(product: Product) {
    this.http
      .delete(`http://localhost:8080/api/products/${product.id}`, {
        withCredentials: true,
      })
      .subscribe(() => {
        this.products = this.products.filter((p) => p.id !== product.id);
        this.searchedProducts = this.products.length;
        this.totalProducts -= 1;
      });
  }
}
