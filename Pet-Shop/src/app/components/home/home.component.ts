import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ItemService } from '../../services/item.service';
import { Item } from '../../models/item.model';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  template: `
    <div class="container">
      <h2>Welcome to Jungle Book Pet Shop</h2>
      <p>Find your perfect companion from our selection of pets and supplies.</p>
      
      <div class="search-section">
        <input 
          type="text" 
          [(ngModel)]="searchName" 
          placeholder="Search by name..."
          (input)="searchItems()"
        >
        <select 
          [(ngModel)]="searchType" 
          (change)="searchItems()"
        >
          <option value="">All Types</option>
          <option value="Dogs">Dogs</option>
          <option value="Cats">Cats</option>
          <option value="Birds">Birds</option>
          <option value="Fish">Fish</option>
          <option value="Exotic pets">Exotic Pets</option>
          <option value="Rodents">Rodents</option>
        </select>
      </div>

      <div class="items-grid">
        <div *ngFor="let item of filteredItems" class="item-card">
          <img [src]="'assets/images/' + item.image" [alt]="item.name">
          <h3>{{ item.name }}</h3>
          <p class="type">{{ item.type }}</p>
          <p class="size">{{ item.size }}</p>
          <p class="price">{{ item.price | currency }}</p>
          <div class="actions">
            <button (click)="viewDetails(item.id)">View Details</button>
            <button (click)="addToCart(item)">Add to Cart</button>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .container {
      width: 100%;
      max-width: 1200px;
      margin: 0 auto;
      padding: 2rem;
    }

    h2 {
      text-align: center;
      color: #2c3e50;
      margin-bottom: 1rem;
    }

    p {
      text-align: center;
      color: #34495e;
      margin-bottom: 2rem;
    }

    .search-section {
      display: flex;
      gap: 1rem;
      margin-bottom: 2rem;
      justify-content: center;
    }

    input, select {
      padding: 0.5rem 1rem;
      border: 1px solid #ddd;
      border-radius: 4px;
      font-size: 1rem;
    }

    .items-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
      gap: 2rem;
      width: 100%;
    }

    .item-card {
      background: white;
      border-radius: 8px;
      padding: 1rem;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
      transition: transform 0.3s ease;
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
      height: 100%;
    }

    .item-card:hover {
      transform: translateY(-5px);
    }

    .item-card img {
      width: 100%;
      height: 200px;
      object-fit: contain;
      border-radius: 4px;
      margin-bottom: 1rem;
      background-color: #f8f9fa;
      padding: 0.5rem;
    }

    .item-card h3 {
      margin: 0.5rem 0;
      color: #2c3e50;
      font-size: 1.2rem;
    }

    .type, .size {
      color: #7f8c8d;
      margin: 0.25rem 0;
      font-size: 0.9rem;
    }

    .price {
      font-weight: bold;
      color: #27ae60;
      margin: 0.5rem 0;
      font-size: 1.1rem;
    }

    .actions {
      display: flex;
      gap: 0.5rem;
      margin-top: auto;
      width: 100%;
    }

    .actions button {
      flex: 1;
      padding: 0.5rem;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      transition: background-color 0.3s ease;
      font-size: 0.9rem;
    }

    .actions button:first-child {
      background-color: #3498db;
      color: white;
    }

    .actions button:last-child {
      background-color: #2ecc71;
      color: white;
    }

    .actions button:hover {
      opacity: 0.9;
    }
  `]
})
export class HomeComponent implements OnInit {
  items: Item[] = [];
  filteredItems: Item[] = [];
  searchName: string = '';
  searchType: string = '';

  constructor(
    private itemService: ItemService,
    private cartService: CartService,
    private router: Router
  ) {}

  ngOnInit() {
    this.items = this.itemService.getItems();
    this.filteredItems = this.items;
  }

  searchItems() {
    this.filteredItems = this.itemService.searchItems({
      name: this.searchName,
      type: this.searchType
    });
  }

  viewDetails(itemId: number) {
    this.router.navigate(['/item', itemId]);
  }

  addToCart(item: Item) {
    this.itemService.addToCart(item);
  }
} 