import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ItemService } from '../../services/item.service';
import { Item } from '../../models/item.model';

@Component({
  standalone: true,
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.css'],
  imports: [CommonModule, FormsModule, RouterModule]
})
export class ItemListComponent implements OnInit {
  items: Item[] = [];
  searchCriteria = {
    name: '',
    type: ''
  };

  constructor(private itemService: ItemService) { }

  ngOnInit(): void {
    this.items = this.itemService.getItems();
  }

  search(): void {
    this.items = this.itemService.searchItems(this.searchCriteria);
  }

  addToCart(item: Item): void {
    this.itemService.addToCart(item);
  }

  removeFromCart(item: Item): void {
    this.itemService.removeFromCart(item);
  }
}
