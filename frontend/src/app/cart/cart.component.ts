import { Component } from '@angular/core';

interface CartItem {
  id: number;
  name: string;
  price: number;
  image?: string;
  quantity: number;
}

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent {
  cart: CartItem[] = [
  ];

  total = 0;

  constructor() {
    this.calculateTotal();
  }

  updateQuantity(item: CartItem) {
    if (!item.quantity || item.quantity < 1) item.quantity = 1;
    this.calculateTotal();
  }

  remove(item: CartItem) {
    this.cart = this.cart.filter(c => c.id !== item.id);
    this.calculateTotal();
  }

  private calculateTotal() {
    this.total = this.cart.reduce((sum, i) => sum + i.price * i.quantity, 0);
  }
}