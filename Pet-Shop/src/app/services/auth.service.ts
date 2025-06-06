import { Injectable } from '@angular/core';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private users: User[] = [
    {
      firstName: 'Stefan',
      lastName: 'Stajic',
      email: 'stajicstefan16@gmail.com',
      phone: '065-418-3764',
      address: 'Rudnicka 3, Beograd',
      favoriteItems: ['Goldfish,Ava Parrot,Persian Cat'],
      password: 'sifra'
    }
  ];

  private currentUser: User | null = null;

  login(email: string, password: string): boolean {
    const user = this.users.find(u => u.email === email && u.password === password);
    if (user) {
      this.currentUser = user;
      return true;
    }
    return false;
  }

  logout(): void {
    this.currentUser = null;
  }

  getCurrentUser(): User | null {
    return this.currentUser;
  }
}
