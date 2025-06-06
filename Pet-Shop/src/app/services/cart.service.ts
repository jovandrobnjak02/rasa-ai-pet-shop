import { Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';

export interface CartItem {
  id: number;
  name: string;
  description: string;
  type: string;
  price: number;
  orderStatus?: 'in progress' | 'completed' | 'cancelled';
  userRating?: number;
}

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private items: CartItem[] = [];
  private cartSubject = new BehaviorSubject<CartItem[]>([]);
  cart$ = this.cartSubject.asObservable();

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    if (isPlatformBrowser(this.platformId)) {
      // Load cart from localStorage only in browser
      const savedCart = localStorage.getItem('cart');
      if (savedCart) {
        this.items = JSON.parse(savedCart);
        this.cartSubject.next(this.items);
      }
    }
  }

  getItems(): CartItem[] {
    return this.items;
  }

  addItem(item: CartItem) {
    const newItem = { ...item, orderStatus: 'in progress' as const };
    this.items.push(newItem);
    this.updateCart();
  }

  removeItem(itemId: number) {
    this.items = this.items.filter(item => item.id !== itemId);
    this.updateCart();
  }

  updateItem(updatedItem: CartItem) {
    const index = this.items.findIndex(item => item.id === updatedItem.id);
    if (index !== -1) {
      this.items[index] = updatedItem;
      this.updateCart();
    }
  }

  updateOrderStatus(itemId: number, status: 'in progress' | 'completed' | 'cancelled') {
    const item = this.items.find(item => item.id === itemId);
    if (item) {
      item.orderStatus = status;
      this.updateCart();
    }
  }

  private updateCart() {
    this.cartSubject.next(this.items);
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('cart', JSON.stringify(this.items));
    }
  }

  clearCart() {
    this.items = [];
    this.updateCart();
  }
}

