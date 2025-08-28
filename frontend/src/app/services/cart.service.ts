import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image?: string;
}

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cart: CartItem[] = [];

  private cartCount = new BehaviorSubject<number>(0);
  cartCount$ = this.cartCount.asObservable();

  private cartItems = new BehaviorSubject<CartItem[]>([]);
  cartItems$ = this.cartItems.asObservable();

  constructor() {
    this.loadCart();
  }

  addToCart(
    product: { id: number; name: string; price: number; imageUrl?: string },
    quantity: number = 1
  ): boolean {
    if (quantity <= 0) return false;

    const index = this.cart.findIndex((i) => i.id === product.id);

    if (index > -1) {
      if (this.cart[index].quantity + quantity > 100) {
        // cap at 100
        this.cart[index].quantity = 100;
        this.updateCartState();
        return false; // signal "not added"
      } else {
        this.cart[index].quantity += quantity;
      }
    } else {
      this.cart.push({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.imageUrl,
        quantity: quantity > 100 ? 100 : quantity,
      });
    }

    this.updateCartState();
    return true;
  }

  removeFromCart(productId: number) {
    this.cart = this.cart.filter((item) => item.id !== productId);
    this.updateCartState();
  }

  updateQuantity(productId: number, quantity: number) {
    const item = this.cart.find((p) => p.id === productId);
    if (item) {
      item.quantity = quantity > 0 ? quantity : 1;
    }
    this.updateCartState();
  }

  getTotal(): number {
    return this.cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }

  getCart(): CartItem[] {
    return [...this.cart];
  }

  clearCart() {
    this.cart = [];
    this.updateCartState();
  }

  private updateCartState() {
    this.cartCount.next(this.getCount());
    this.cartItems.next([...this.cart]);
    this.saveCart();
  }

  private getCount(): number {
    return this.cart.reduce((sum, item) => sum + item.quantity, 0);
  }

  private saveCart() {
    localStorage.setItem('cart', JSON.stringify(this.cart));
  }

  private loadCart() {
    const data = localStorage.getItem('cart');
    if (data) {
      this.cart = JSON.parse(data);
      this.updateCartState();
    }
  }
}
