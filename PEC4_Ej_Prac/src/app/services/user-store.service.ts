import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserStoreService {
  private readonly TOKEN_KEY = 'auth_token';
  private readonly authenticatedSubject = new BehaviorSubject<boolean>(this.hasToken());

  authenticated$ = this.authenticatedSubject.asObservable();

  get token(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  login(token: string): void {
    localStorage.setItem(this.TOKEN_KEY, token);
    this.authenticatedSubject.next(true);
  }

  logout(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    this.authenticatedSubject.next(false);
  }

  isAuthenticated(): boolean {
    return this.hasToken();
  }

  private hasToken(): boolean {
    return Boolean(localStorage.getItem(this.TOKEN_KEY));
  }
}
