import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

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
  totalProducts = 0;

  products: any[] = [];
  searchText: string = ''; // <-- add this line

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
      .get<Product[]>(`http://localhost:8080/api/products/search`, {
        params,
        withCredentials: true,
      })
      .subscribe((data) => {
        this.products = data;
        this.totalProducts = this.products?.length ?? 0;
      });
  }
}
