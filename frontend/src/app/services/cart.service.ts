// cart.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image?: string;
}

type ProductLike = { id: number; name: string; price: number; imageUrl?: string };

@Injectable({ providedIn: 'root' })
export class CartService {
  private cart: CartItem[] = [];

  private cartCount = new BehaviorSubject<number>(0);
  cartCount$ = this.cartCount.asObservable();

  private cartItems = new BehaviorSubject<CartItem[]>([]);
  cartItems$ = this.cartItems.asObservable();

  constructor() { this.loadCart(); }

  addToCart(
    product: { id: number; name: string; price: number; imageUrl?: string },
    quantity: number = 1
  ): boolean {
    if (quantity <= 0) return false;

    const index = this.cart.findIndex((i) => i.id === product.id);

    if (index > -1) {
      if (this.cart[index].quantity + quantity > 100) {
        this.cart[index].quantity = 100;
        this.updateCartState();
        return false;
      } else {
        this.cart[index].quantity += quantity;
      }
    } else {
      this.cart.push({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.imageUrl, // <-- keep IMAGE here
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
    if (item) item.quantity = quantity > 0 ? quantity : 1;
    this.updateCartState();
  }

  getTotal(): number {
    return this.cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }

  getCart(): CartItem[] { return [...this.cart]; }

  clearCart() { this.cart = []; this.updateCartState(); }

  /** 🔁 NEW: bulk-sync cart with latest products (front-end only) */
  syncWithProducts(products: ProductLike[]) {
    if (!products?.length) return;
    const byId = new Map(products.map(p => [p.id, p]));
    let changed = false;

    this.cart = this.cart.map(item => {
      const p = byId.get(item.id);
      if (!p) return item;

      const next: CartItem = {
        ...item,
        name: p.name,
        price: p.price,
        image: p.imageUrl ?? item.image, // keep your 'image' prop
      };

      if (
        next.name !== item.name ||
        next.price !== item.price ||
        next.image !== item.image
      ) changed = true;

      return next;
    });

    if (changed) this.updateCartState();
  }

  /** 🔁 NEW: single-product sync helper (use after edit success) */
  applyProductUpdate(p: ProductLike) {
    const i = this.cart.findIndex(c => c.id === p.id);
    if (i > -1) {
      this.cart[i] = {
        ...this.cart[i],
        name: p.name,
        price: p.price,
        image: p.imageUrl ?? this.cart[i].image,
      };
      this.updateCartState();
    }
  }

  private updateCartState() {
    this.cartCount.next(this.getCount());
    this.cartItems.next([...this.cart]);
    this.saveCart();
  }

  private getCount(): number {
    return this.cart.reduce((sum, item) => sum + item.quantity, 0);
  }

  private saveCart() { localStorage.setItem('cart', JSON.stringify(this.cart)); }

  private loadCart() {
    const data = localStorage.getItem('cart');
    if (data) {
      this.cart = JSON.parse(data);
      this.updateCartState();
    }
  }
}
