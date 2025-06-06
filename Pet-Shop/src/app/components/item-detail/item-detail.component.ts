import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ItemService } from '../../services/item.service';
import { Item } from '../../models/item.model';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-item-detail',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="container" *ngIf="item">
      <div class="item-detail">
        <div class="image-section">
          <img [src]="'assets/images/' + item.image" [alt]="item.name">
        </div>
        <div class="info-section">
          <h2>{{ item.name }}</h2>
          <p class="type">Type: {{ item.type }}</p>
          <p class="size">Size: {{ item.size }}</p>
          <p class="manufacturer">Manufacturer: {{ item.manufacturer }}</p>
          <p class="date">Available since: {{ item.productDate | date }}</p>
          <p class="price">{{ item.price | currency }}</p>
          <div class="actions">
            <button (click)="addToCart()">Add to Cart</button>
            <button (click)="goBack()">Back to List</button>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .container {
      padding: 2rem;
    }

    .item-detail {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 2rem;
      background: white;
      border-radius: 8px;
      padding: 2rem;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }

    .image-section img {
      width: 100%;
      height: 400px;
      object-fit: cover;
      border-radius: 8px;
    }

    .info-section {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }

    h2 {
      color: #2c3e50;
      margin: 0;
    }

    .type, .size, .manufacturer, .date {
      color: #7f8c8d;
      margin: 0;
    }

    .price {
      font-size: 1.5rem;
      font-weight: bold;
      color: #27ae60;
      margin: 1rem 0;
    }

    .actions {
      display: flex;
      gap: 1rem;
      margin-top: auto;
    }

    button {
      flex: 1;
      padding: 0.8rem;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      transition: background-color 0.3s ease;
      font-size: 1rem;
    }

    button:first-child {
      background-color: #2ecc71;
      color: white;
    }

    button:last-child {
      background-color: #3498db;
      color: white;
    }

    button:hover {
      opacity: 0.9;
    }

    @media (max-width: 768px) {
      .item-detail {
        grid-template-columns: 1fr;
      }
    }
  `]
})
export class ItemDetailComponent implements OnInit {
  item: Item | undefined;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private itemService: ItemService,
    private cartService: CartService
  ) {}

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.item = this.itemService.getItemById(id);
    
    if (!this.item) {
      this.router.navigate(['/']);
    }
  }

  addToCart() {
    if (this.item) {
      this.itemService.addToCart(this.item);
    }
  }

  goBack() {
    this.router.navigate(['/']);
  }
}
