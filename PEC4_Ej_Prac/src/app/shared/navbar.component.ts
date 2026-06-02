import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { UserStoreService } from '../services/user-store.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  template: `
    <nav class="navbar">
      <div class="brand">UOC Ecommerce</div>
      <div class="nav-links">
        <a routerLink="/login" routerLinkActive="active">Login</a>
        <a routerLink="/register" routerLinkActive="active">Register</a>
        <a routerLink="/article/list" routerLinkActive="active">Articles list</a>
        <a routerLink="/article/create" routerLinkActive="active">Create Article</a>
      </div>
      <button *ngIf="authenticated$ | async" class="logout" (click)="logout()">Logout</button>
    </nav>
  `,
  styles: [
    `
      .navbar {
        display: flex;
        flex-wrap: wrap;
        gap: 1rem;
        align-items: center;
        justify-content: space-between;
        background: #0f172a;
        color: #fff;
        padding: 0.8rem 1rem;
      }
      .brand {
        font-weight: 700;
      }
      .nav-links {
        display: flex;
        flex-wrap: wrap;
        gap: 0.75rem;
      }
      a {
        color: #cbd5e1;
        text-decoration: none;
      }
      a.active {
        color: #f8fafc;
        font-weight: 600;
      }
      .logout {
        border: none;
        background: #ef4444;
        color: #fff;
        padding: 0.5rem 0.9rem;
        border-radius: 0.35rem;
        cursor: pointer;
      }
    `
  ]
})
export class NavbarComponent {
  constructor(private userStore: UserStoreService) {}

  get authenticated$() {
    return this.userStore.authenticated$;
  }

  logout(): void {
    this.userStore.logout();
  }
}
