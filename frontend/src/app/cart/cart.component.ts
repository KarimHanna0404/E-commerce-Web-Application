import { Component, OnInit } from '@angular/core';
import { CartService, CartItem } from '../services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
  standalone:false,
})
export class CartComponent implements OnInit {
  cart: CartItem[] = [];
  total = 0;

  constructor(private cartService: CartService) {}

  ngOnInit() {
    this.cartService.cartItems$.subscribe((items) => {
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
}
