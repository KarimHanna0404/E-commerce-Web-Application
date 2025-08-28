import { Component, OnInit, inject } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpParams,
} from '@angular/common/http';
import { Router } from '@angular/router';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { CartService } from '../../services/cart.service';
import { MessageService } from 'primeng/api';

interface Product {
  id: number;
  name: string;
  imageUrl: string;
  description: string;
  price: number;
  code: string;
  safeDescription?: SafeHtml;
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

  constructor(
    private http: HttpClient,
    private sanitizer: DomSanitizer,
    private cartService: CartService,
    private messageService: MessageService
  ) {}

  addToCart(product: Product) {
    const added = this.cartService.addToCart(product, 1);

    if (added) {
      this.messageService.add({
        severity: 'success',
        summary: 'Added to Cart',
        detail: `${product.name} has been added to your cart.`,
        life: 3000,
      });
    } else {
      this.messageService.add({
        severity: 'warn',
        summary: 'Limit Reached',
        detail: `${product.name} already reached the max limit (100).`,
        life: 3000,
      });
    }
  }

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
        this.products = data.map((p) => ({
          ...p,
          safeDescription: this.sanitizer.bypassSecurityTrustHtml(
            p.description
          ),
        }));

        this.searchedProducts = this.products.length;
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
      .subscribe({
        next: () => {
          this.products = this.products.filter((p) => p.id !== product.id);
          this.searchedProducts = this.products.length;
          this.totalProducts -= 1;
          this.cartService.removeFromCart(product.id);
        },
        error: (err: HttpErrorResponse) => {
          console.log(err);
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: err.error.message,
          });
        },
      });
  }
}
