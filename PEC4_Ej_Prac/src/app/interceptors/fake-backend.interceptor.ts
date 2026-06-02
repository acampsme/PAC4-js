import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { delay, mergeMap } from 'rxjs/operators';
import { Article } from '../models/article.model';
import { UserCredentials } from '../models/user.model';

const storageKey = 'fake_backend_users';
const fakeToken = 'fake-jwt-token';

const initialArticles: Article[] = [
  {
    id: 1,
    title: 'Smartphone X50',
    description: 'Telèfon intel·ligent amb pantalla OLED i càmera triple.',
    price: 499,
    quantity: 12,
    imageUrl: '/article1.jpg'
  },
  {
    id: 2,
    title: 'Auriculars Wireless',
    description: 'Auriculars sense fils amb cancel·lació de soroll.',
    price: 89,
    quantity: 28,
    imageUrl: '/article2.jpg'
  },
  {
    id: 3,
    title: 'Portàtil Ultrafí',
    description: 'Portàtil lleuger amb bateria de llarga durada.',
    price: 1099,
    quantity: 8,
    imageUrl: '/article3.jpg'
  }
];

@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return of(null).pipe(
      delay(300),
      mergeMap(() => {
        if (req.url.endsWith('/user/login') && req.method === 'POST') {
          return this.handleLogin(req as HttpRequest<UserCredentials>);
        }

        if (req.url.endsWith('/user/register') && req.method === 'POST') {
          return this.handleRegister(req as HttpRequest<UserCredentials>);
        }

        if (req.url.endsWith('/api/articles') && req.method === 'GET') {
          return this.handleGetArticles(req);
        }

        if (req.url.match(/\/api\/articles\/\d+$/) && req.method === 'GET') {
          return this.handleGetArticleById(req);
        }

        if (req.url.match(/\/api\/articles\/\d+$/) && req.method === 'PATCH') {
          return this.handlePatchArticle(req);
        }

        if (req.url.endsWith('/api/articles') && req.method === 'POST') {
          return this.handleCreateArticle(req);
        }

        return next.handle(req);
      })
    );
  }

  private getUsers(): UserCredentials[] {
    const stored = localStorage.getItem(storageKey);
    return stored ? JSON.parse(stored) : [];
  }

  private saveUsers(users: UserCredentials[]): void {
    localStorage.setItem(storageKey, JSON.stringify(users));
  }

  private handleLogin(req: HttpRequest<UserCredentials>): Observable<HttpEvent<unknown>> {
    const { username, password } = req.body ?? {} as UserCredentials;
    const user = this.getUsers().find((u) => u.username === username && u.password === password);

    if (!user) {
      return throwError(() => new HttpErrorResponse({ status: 401, statusText: 'Unauthorized', error: { message: 'Invalid credentials' } }));
    }

    return of(new HttpResponse({ status: 200, body: { token: fakeToken } }));
  }

  private handleRegister(req: HttpRequest<UserCredentials>): Observable<HttpEvent<unknown>> {
    const { username, password } = req.body ?? {} as UserCredentials;
    const users = this.getUsers();

    if (!username || !password) {
      return throwError(() => new HttpErrorResponse({ status: 400, statusText: 'Bad Request', error: { message: 'Username and password required' } }));
    }

    if (users.some((user) => user.username === username)) {
      return throwError(() => new HttpErrorResponse({ status: 409, statusText: 'Conflict', error: { message: 'User already exists' } }));
    }

    users.push({ username, password });
    this.saveUsers(users);

    return of(new HttpResponse({ status: 201, body: { token: fakeToken } }));
  }

  private handleGetArticles(req: HttpRequest<unknown>): Observable<HttpEvent<unknown>> {
    const articles = this.getArticles();
    const query = new URLSearchParams(req.urlWithParams.split('?')[1] ?? '').get('q')?.toLowerCase();

    const filtered = query
      ? articles.filter((article) => article.title.toLowerCase().includes(query) || article.description.toLowerCase().includes(query))
      : articles;

    return of(new HttpResponse({ status: 200, body: filtered }));
  }

  private handleGetArticleById(req: HttpRequest<unknown>): Observable<HttpEvent<unknown>> {
    const id = this.extractId(req.url);
    const article = this.getArticles().find((item) => item.id === id);

    if (!article) {
      return throwError(() => new HttpErrorResponse({ status: 404, statusText: 'Not Found', error: { message: 'Article not found' } }));
    }

    return of(new HttpResponse({ status: 200, body: article }));
  }

  private handlePatchArticle(req: HttpRequest<unknown>): Observable<HttpEvent<unknown>> {
    const id = this.extractId(req.url);
    const body = req.body as { changeInQuantity?: number };
    const articles = this.getArticles();
    const article = articles.find((item) => item.id === id);

    if (!article || typeof body.changeInQuantity !== 'number') {
      return throwError(() => new HttpErrorResponse({ status: 400, statusText: 'Bad Request', error: { message: 'Invalid request' } }));
    }

    article.quantity += body.changeInQuantity;
    this.saveArticles(articles);

    return of(new HttpResponse({ status: 200, body: article }));
  }

  private handleCreateArticle(req: HttpRequest<unknown>): Observable<HttpEvent<unknown>> {
    const article = req.body as Article;

    if (!article.title || !article.description || typeof article.price !== 'number' || typeof article.quantity !== 'number') {
      return throwError(() => new HttpErrorResponse({ status: 400, statusText: 'Bad Request', error: { message: 'Invalid article data' } }));
    }

    const articles = this.getArticles();
    const nextId = Math.max(0, ...articles.map((item) => item.id ?? 0)) + 1;
    const newArticle = { ...article, id: nextId };
    articles.push(newArticle);
    this.saveArticles(articles);

    return of(new HttpResponse({ status: 201, body: newArticle }));
  }

  private getArticles(): Article[] {
    const saved = localStorage.getItem('fake_backend_articles');
    if (saved) {
      return JSON.parse(saved) as Article[];
    }

    localStorage.setItem('fake_backend_articles', JSON.stringify(initialArticles));
    return initialArticles.slice();
  }

  private saveArticles(articles: Article[]): void {
    localStorage.setItem('fake_backend_articles', JSON.stringify(articles));
  }

  private extractId(url: string): number {
    const parts = url.split('/');
    return Number(parts[parts.length - 1]);
  }
}
