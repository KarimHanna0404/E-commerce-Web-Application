import { Component, OnInit,inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';

interface Product {
  id: number;
  name: string;
  image: string;
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

  products: any[] = [];
  searchText: string = '';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.searchProducts();
  }

  onSearchProducts(_: any) {
    this.searchProducts();
  }

  searchProducts() {
    let params: HttpParams = new HttpParams();
    if (this.searchText) {
      params = params.set('query', this.searchText);
    }
    this.http
      .get<{ Products: Product[]; totalProducts: number }>(`http://localhost:8080/api/products/search`, {
        params,
        withCredentials: true,
      })
      .subscribe((data) => {
        this.products = data.Products;
        this.totalProducts = data.totalProducts;
      });
  }

onEdit(id: number): void {
  console.log(id);
    this.router.navigate(['/products', id, 'edit']);
}


deleteProduct(product: Product) {
  if (confirm(`Delete product "${product.name}"?`)) {
    this.http
      .delete(`http://localhost:8080/api/products/${product.id}`, {
        withCredentials: true,
      })
      .subscribe(() => {
        this.products = this.products.filter((p) => p.id !== product.id);
        this.totalProducts = this.products.length;
      });
  }
}

}
