import { Injectable } from '@angular/core';
import { Item } from '../models/item.model';
import { CartService } from './cart.service';

@Injectable({
  providedIn: 'root'
})
export class ItemService {
  private items: Item[] = [
    {
      id: 1,
      name: 'Goldfish',
      type: 'Fish',
      size: 'Small (up to 15 cm)',
      manufacturer: 'Asia',
      productDate: new Date('2023-01-01'),
      price: 15,
      reviews: [],
      status: 'in progress',
      image: 'goldfish.jpg',
      rating: 0
    },
    {
      id: 2,
      name: 'Ara Parrot',
      type: 'Birds',
      size: 'Large (around 90 cm with tail)',
      manufacturer: 'South Africa',
      productDate: new Date('2023-03-15'),
      price: 1050,
      reviews: [],
      status: 'in progress',
      image: 'ara.jpg',
      rating: 0
    },
    {
      id: 3,
      name: 'Labrador Retriever',
      type: 'Dogs',
      size: 'Medium (30kg)',
      manufacturer: 'Canada',
      productDate: new Date('2023-05-10'),
      price: 600,
      reviews: [],
      status: 'in progress',
      image: 'labrador.jpg',
      rating: 0
    },
    {
      id: 4,
      name: 'Persian Cat',
      type: 'Cats',
      size: 'Medium (5kg)',
      manufacturer: 'Iran',
      productDate: new Date('2023-05-01'),
      price: 400,
      reviews: [],
      status: 'in progress',
      image: 'cat.jpg',
      rating: 0
    },
    {
      id: 5,
      name: 'African Hedgehog',
      type: 'Exotic pets',
      size: 'Small (15cm)',
      manufacturer: 'Africa',
      productDate: new Date('2023-05-10'),
      price: 125,
      reviews: [],
      status: 'in progress',
      image: 'pet.jpg',
      rating: 0
    },
    {
      id: 6,
      name: 'Koi Fish',
      type: 'Fish',
      size: 'Large (40cm)',
      manufacturer: 'Japan',
      productDate: new Date('2023-05-15'),
      price: 50,
      reviews: [],
      status: 'in progress',
      image: 'fish.jpg',
      rating: 0
    },
    {
      id: 7,
      name: 'Scottish Collie',
      type: 'Dogs',
      size: 'Large (25cm)',
      manufacturer: 'Scotland',
      productDate: new Date('2023-05-15'),
      price: 700,
      reviews: [],
      status: 'in progress',
      image: 'collie.jpg',
      rating: 0
    },
    {
      id: 8,
      name: 'Canary',
      type: 'Birds',
      size: 'Small (10cm)',
      manufacturer: 'Canary Islands',
      productDate: new Date('2023-05-20'),
      price: 40,
      reviews: [],
      status: 'in progress',
      image: 'canary.jpg',
      rating: 0
    },
    {
      id: 9,
      name: 'Mini Rex Rabbit',
      type: 'Rodents',
      size: 'Small (2kg)',
      manufacturer: 'USA',
      productDate: new Date('2023-05-20'),
      price: 75,
      reviews: [],
      status: 'in progress',
      image: 'rabbit.jpg',
      rating: 0
    },
    {
      id: 10,
      name: 'Greek Tortoise (Testudo)',
      type: 'Exotic pets',
      size: 'Small (30cm)',
      manufacturer: 'Mediterranean',
      productDate: new Date('2023-05-20'),
      price: 400,
      reviews: [],
      status: 'in progress',
      image: 'tortoise.jpg',
      rating: 0
    }
  ];

  constructor(private cartService: CartService) {}

  getItems(): Item[] {
    return this.items;
  }

  getItemById(id: number): Item | undefined {
    return this.items.find(item => item.id === id);
  }

  searchItems(criteria: { name: string; type: string }): Item[] {
    return this.items.filter(item => {
      const matchesName = criteria.name ? item.name.toLowerCase().includes(criteria.name.toLowerCase()) : true;
      const matchesType = criteria.type ? item.type.toLowerCase().includes(criteria.type.toLowerCase()) : true;
      return matchesName && matchesType;
    });
  }

  reserveItem(itemId: number): void {
    const item = this.getItemById(itemId);
    if (item) {
      item.status = 'in progress';
    }
  }

  updateItemStatus(itemId: number, status: 'in progress' | 'completed' | 'cancelled'): void {
    const item = this.getItemById(itemId);
    if (item) {
      item.status = status;
    }
  }

  addToCart(item: Item): void {
    this.cartService.addItem({
      id: item.id,
      name: item.name,
      description: `${item.type} - ${item.size}`,
      type: item.type,
      price: item.price
    });
  }

  removeFromCart(item: Item): void {
    this.cartService.removeItem(item.id);
  }

  searchItemsByStatus(status: 'in progress' | 'completed' | 'cancelled'): Item[] {
    return this.items.filter(item => item.status === status);
  }
}
