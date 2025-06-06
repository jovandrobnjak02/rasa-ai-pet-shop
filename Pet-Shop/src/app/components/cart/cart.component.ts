import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CartService, CartItem } from '../../services/cart.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cartItems: CartItem[] = [];
  totalPrice = 0;
  isLoggedIn = false;

  constructor(
    private cartService: CartService,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.cartItems = this.cartService.getItems();
    this.updateTotalPrice();
    
    this.userService.isLoggedIn$.subscribe(
      loggedIn => this.isLoggedIn = loggedIn
    );
  }

  updateTotalPrice() {
    this.totalPrice = this.cartItems.reduce((total, item) => total + item.price, 0);
  }

  rateItem(item: CartItem, rating: number) {
    if (item.orderStatus === 'completed') {
      item.userRating = rating;
      this.cartService.updateItem(item);
    }
  }

  updateOrder(item: CartItem) {
    // In a real app, this would open a modal or navigate to an update form
    console.log('Update order for:', item);
  }

  removeFromCart(item: CartItem) {
    this.cartService.removeItem(item.id);
    this.cartItems = this.cartService.getItems();
    this.updateTotalPrice();
  }

  checkout() {
    if (!this.isLoggedIn) {
      // Navigate to login
      console.log('Please login to checkout');
    } else {
      // Process checkout
      console.log('Processing checkout');
    }
  }
}
