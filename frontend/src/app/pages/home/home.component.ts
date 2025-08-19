import { Component ,OnInit} from '@angular/core';
import { HttpClient } from '@angular/common/http';

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
  standalone:false,
})
export class HomepageComponent implements OnInit {
  totalProducts = 0;

  products: any[] = [];
  searchText: string = '';  // <-- add this line

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts() {
    this.http.get<any[]>('http://localhost:8080/api/products')
      .subscribe(data => {
        this.products = data;
      });
  }

  searchProducts() {
    if (!this.searchText) {
      this.loadProducts();
      return;
    }

  this.http.get<any[]>(`http://localhost:8080/api/products/search?query=${this.searchText}`, { withCredentials: true })
  .subscribe(data => {
    this.products = data;
  });
  }
}