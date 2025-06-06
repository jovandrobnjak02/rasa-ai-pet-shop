import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  user: User | null = null;
  favoritePetTypesInput: string = '';

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.userService.currentUser$.subscribe(user => {
      this.user = user;
      if (user) {
        this.favoritePetTypesInput = user.favoritePetTypes.join(', ');
      }
    });
  }

  updateProfile() {
    if (this.user) {
      const updatedUser = {
        ...this.user,
        favoritePetTypes: this.favoritePetTypesInput.split(',').map(type => type.trim())
      };
      this.userService.updateProfile(updatedUser);
    }
  }
}
