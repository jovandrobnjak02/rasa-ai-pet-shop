import { Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { User } from '../models/user.model';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  private isLoggedInSubject = new BehaviorSubject<boolean>(false);

  currentUser$ = this.currentUserSubject.asObservable();
  isLoggedIn$ = this.isLoggedInSubject.asObservable();

  constructor(
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.initializeUser();
  }

  private initializeUser(): void {
    if (isPlatformBrowser(this.platformId)) {
      const savedUser = localStorage.getItem('currentUser');
      if (savedUser) {
        this.currentUserSubject.next(JSON.parse(savedUser));
        this.isLoggedInSubject.next(true);
      }
    }
  }

  private setUserInStorage(user: User | null): void {
    if (isPlatformBrowser(this.platformId)) {
      if (user) {
        localStorage.setItem('currentUser', JSON.stringify(user));
      } else {
        localStorage.removeItem('currentUser');
      }
    }
  }

  getCurrentUser(): User | null {
    return this.currentUserSubject.value;
  }

  updateUser(user: User): void {
    this.currentUserSubject.next(user);
    this.setUserInStorage(user);
  }

  login(email: string, password: string): boolean {
    // Simulate login - in real app, this would be an API call
    const user: User = {
      id: 1,
      name: 'Test User',
      email: email,
      phone: '123-456-7890',
      address: '123 Test St',
      favoritePetTypes: []
    };

    this.currentUserSubject.next(user);
    this.isLoggedInSubject.next(true);
    this.setUserInStorage(user);
    return true;
  }

  logout(): void {
    this.currentUserSubject.next(null);
    this.isLoggedInSubject.next(false);
    this.setUserInStorage(null);
    this.router.navigate(['/']);
  }

  register(userData: Omit<User, 'id'>): boolean {
    // Simulate registration - in real app, this would be an API call
    const newUser: User = {
      id: Date.now(), // Generate a temporary ID
      ...userData
    };

    this.currentUserSubject.next(newUser);
    this.isLoggedInSubject.next(true);
    this.setUserInStorage(newUser);
    return true;
  }

  updateProfile(userData: Partial<User>): void {
    const currentUser = this.currentUserSubject.value;
    if (currentUser) {
      const updatedUser = { ...currentUser, ...userData };
      this.currentUserSubject.next(updatedUser);
      this.setUserInStorage(updatedUser);
    }
  }

  addFavoritePetType(petType: string): void {
    const currentUser = this.currentUserSubject.value;
    if (currentUser && !currentUser.favoritePetTypes.includes(petType)) {
      const updatedUser = {
        ...currentUser,
        favoritePetTypes: [...currentUser.favoritePetTypes, petType]
      };
      this.currentUserSubject.next(updatedUser);
      this.setUserInStorage(updatedUser);
    }
  }

  removeFavoritePetType(petType: string): void {
    const currentUser = this.currentUserSubject.value;
    if (currentUser) {
      const updatedUser = {
        ...currentUser,
        favoritePetTypes: currentUser.favoritePetTypes.filter(type => type !== petType)
      };
      this.currentUserSubject.next(updatedUser);
      this.setUserInStorage(updatedUser);
    }
  }
}
