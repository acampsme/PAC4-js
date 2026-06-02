import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { BehaviorSubject, debounceTime, distinctUntilChanged, merge, startWith, switchMap } from 'rxjs';
import { ArticleService } from '../services/article.service';
import { Article } from '../models/article.model';
import { DefaultImagePipe } from '../pipes/default-image.pipe';

@Component({
  selector: 'app-article-list',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink, DefaultImagePipe],
  template: `
    <section class="page-shell">
      <div class="head-row">
        <h2>Article list</h2>
        <input [formControl]="searchControl" placeholder="Search articles" />
      </div>
      <div class="grid">
        <article *ngFor="let article of articles$ | async" class="card">
          <img [src]="article.imageUrl | defaultImage" [alt]="article.title" />
          <div class="card-body">
            <h3>{{ article.title }}</h3>
            <p>{{ article.description }}</p>
            <p class="price">{{ article.price | currency:'EUR':'symbol':'1.2-2' }}</p>
            <p>Quantity: {{ article.quantity }}</p>
            <div class="buttons">
              <button type="button" (click)="updateQuantity(article.id!, -1)">-</button>
              <button type="button" (click)="updateQuantity(article.id!, 1)">+</button>
              <a [routerLink]="['/article', article.id]">Details</a>
            </div>
          </div>
        </article>
      </div>
    </section>
  `,
  styles: [
    `.page-shell { max-width: 1120px; margin: 2rem auto; padding: 1rem; }
     .head-row { display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: 1rem; margin-bottom: 1rem; }
     input { min-width: 240px; padding: 0.75rem; border-radius: 0.5rem; border: 1px solid #cbd5e1; }
     .grid { display: grid; gap: 1rem; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); }
     .card { border: 1px solid #cbd5e1; border-radius: 0.75rem; overflow: hidden; background: #fff; display: flex; flex-direction: column; }
     .card img { width: 100%; height: 200px; object-fit: cover; }
     .card-body { padding: 1rem; display: grid; gap: 0.75rem; }
     .price { font-weight: 700; }
     .buttons { display: flex; gap: 0.5rem; flex-wrap: wrap; align-items: center; }
     button { border: none; background: #0f172a; color: #fff; padding: 0.6rem 0.85rem; border-radius: 0.5rem; cursor: pointer; }
     a { color: #0f172a; text-decoration: underline; }
    `
  ]
})
export class ArticleListComponent implements OnInit {
  searchControl = new FormControl('');
  refresh$ = new BehaviorSubject<void>(undefined);
  articles$ = merge(
    this.refresh$,
    this.searchControl.valueChanges.pipe(debounceTime(250), distinctUntilChanged())
  ).pipe(
    startWith(''),
    switchMap(() => this.articleService.getArticles(this.searchControl.value as string))
  );

  constructor(private articleService: ArticleService) {}

  ngOnInit(): void {}

  updateQuantity(articleId: number, change: number): void {
    this.articleService.changeQuantity(articleId, change).subscribe(() => {
      this.refresh$.next();
    });
  }
}
