import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Observable, switchMap } from 'rxjs';
import { ArticleService } from '../services/article.service';
import { Article } from '../models/article.model';
import { DefaultImagePipe } from '../pipes/default-image.pipe';

@Component({
  selector: 'app-article-detail',
  standalone: true,
  imports: [CommonModule, RouterLink, DefaultImagePipe],
  template: `
    <section class="page-shell" *ngIf="article$ | async as article; else loading">
      <div class="detail-card">
        <img [src]="article.imageUrl | defaultImage" [alt]="article.title" />
        <div class="detail-body">
          <h2>{{ article.title }}</h2>
          <p>{{ article.description }}</p>
          <p><strong>Price:</strong> {{ article.price | currency:'EUR':'symbol':'1.2-2' }}</p>
          <p><strong>Quantity:</strong> {{ article.quantity }}</p>
          <a routerLink="/article/list">Back to list</a>
        </div>
      </div>
    </section>
    <ng-template #loading>
      <div class="page-shell">Loading article details...</div>
    </ng-template>
  `,
  styles: [
    `.page-shell { max-width: 900px; margin: 2rem auto; padding: 1rem; }
     .detail-card { display: grid; gap: 1rem; border: 1px solid #cbd5e1; padding: 1rem; border-radius: 0.75rem; background: #fff; }
     img { width: 100%; max-height: 420px; object-fit: cover; border-radius: 0.75rem; }
     .detail-body { display: grid; gap: 0.75rem; }
     a { color: #0f172a; text-decoration: underline; }
    `
  ]
})
export class ArticleDetailComponent implements OnInit {
  article$!: Observable<Article>;

  constructor(private route: ActivatedRoute, private articleService: ArticleService) {}

  ngOnInit(): void {
    this.article$ = this.route.paramMap.pipe(
      switchMap((params) => {
        const id = Number(params.get('id'));
        return this.articleService.getArticleById(id);
      })
    );
  }
}
