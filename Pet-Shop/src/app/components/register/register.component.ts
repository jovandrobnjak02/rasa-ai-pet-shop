import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  userData = {
    name: '',
    email: '',
    phone: '',
    address: '',
    password: '',
    favoritePetTypes: [] as string[]
  };

  constructor(
    private userService: UserService,
    private router: Router
  ) {}

  register() {
    try {
      this.userService.register(this.userData);
      this.router.navigate(['/profile']);
    } catch (error) {
      console.error('Registration failed:', error);
      // Handle registration error (show message to user)
    }
  }
}
