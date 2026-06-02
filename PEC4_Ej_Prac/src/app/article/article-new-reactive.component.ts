import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ArticleService } from '../services/article.service';

@Component({
  selector: 'app-article-new-reactive',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <section class="page-shell">
      <h2>Create article</h2>
      <form [formGroup]="form" (ngSubmit)="submit()" class="form-card">
        <label>
          Title
          <input formControlName="title" />
        </label>
        <label>
          Description
          <textarea formControlName="description"></textarea>
        </label>
        <label>
          Price
          <input formControlName="price" type="number" step="0.01" />
        </label>
        <label>
          Quantity
          <input formControlName="quantity" type="number" />
        </label>
        <label>
          Image URL
          <input formControlName="imageUrl" />
        </label>
        <button type="submit" [disabled]="form.invalid">Create</button>
        <p *ngIf="message" class="success">{{ message }}</p>
      </form>
    </section>
  `,
  styles: [
    `.page-shell { max-width: 520px; margin: 2rem auto; padding: 1rem; }
     .form-card { display: grid; gap: 1rem; background: #ffffff; border: 1px solid #cbd5e1; padding: 1.2rem; border-radius: 0.75rem; }
     label { display: grid; gap: 0.4rem; font-weight: 600; }
     input, textarea { width: 100%; padding: 0.75rem; border: 1px solid #cbd5e1; border-radius: 0.5rem; }
     textarea { min-height: 130px; resize: vertical; }
     button { border: none; background: #0f172a; color: #fff; padding: 0.9rem; border-radius: 0.5rem; cursor: pointer; }
     .success { color: #154f31; margin: 0; }
    `
  ]
})
export class ArticleNewReactiveComponent {
  form: FormGroup;
  message = '';

  constructor(private fb: FormBuilder, private articleService: ArticleService, private router: Router) {
    this.form = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      price: [0, [Validators.required, Validators.min(0.01)]],
      quantity: [0, [Validators.required, Validators.min(0)]],
      imageUrl: ['']
    });
  }

  submit(): void {
    if (this.form.invalid) {
      return;
    }

    const article = this.form.value;
    this.articleService.create(article).subscribe({
      next: () => {
        this.message = 'Article created successfully.';
        setTimeout(() => this.router.navigate(['/article/list']), 900);
      },
      error: () => {
        this.message = 'There was an error creating the article.';
      }
    });
  }
}
