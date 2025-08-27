import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CartService, CartItem } from '../services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
  standalone: false
})
export class CartComponent implements OnInit {
  cart: CartItem[] = [];
  total = 0;

  constructor(
    private cartService: CartService,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.cartService.cartItems$.subscribe(items => {
      this.cart = items;
      this.total = this.cartService.getTotal();
    });
  }

  updateQuantity(item: CartItem) {
    this.cartService.updateQuantity(item.id, item.quantity);
  }

  remove(item: CartItem) {
    this.cartService.removeFromCart(item.id);
  }

checkout() {
  if (this.cart.length === 0) return;

  const orderRequest = {
    totalAmount: this.total,
    items: this.cart.map(item => ({
      productId: item.id, 
      quantity: item.quantity
    }))
  };

  this.http.post('http://localhost:8080/api/orders', orderRequest, { withCredentials: true })
    .subscribe({
      next: (createdOrder: any) => {
        this.cartService.clearCart();
        this.router.navigate(['/orders']);
      },
      error: (err) => {
        console.error('Failed to create order', err);
        alert('Failed to create order. Please try again.');
      }
    });
}

}
