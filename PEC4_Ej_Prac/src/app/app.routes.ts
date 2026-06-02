import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'login' },
  {
    path: '',
    loadChildren: () => import('./user/user.module').then((m) => m.UserModule)
  },
  {
    path: 'article',
    loadChildren: () => import('./article/article.module').then((m) => m.ArticleModule)
  },
  { path: '**', redirectTo: 'login' }
];
