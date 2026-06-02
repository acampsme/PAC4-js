import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ArticleListComponent } from './article-list.component';
import { ArticleDetailComponent } from './article-detail.component';
import { ArticleNewReactiveComponent } from './article-new-reactive.component';
import { AuthGuard } from '../guards/auth.guard';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      { path: 'list', component: ArticleListComponent },
      { path: 'create', component: ArticleNewReactiveComponent, canActivate: [AuthGuard] },
      { path: ':id', component: ArticleDetailComponent }
    ]),
    ArticleListComponent,
    ArticleDetailComponent,
    ArticleNewReactiveComponent
  ]
})
export class ArticleModule {}
