import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Article } from '../models/article.model';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {
  private readonly baseUrl = '/api/articles';

  constructor(private http: HttpClient) {}

  getArticles(query?: string): Observable<Article[]> {
    const params = query ? new HttpParams().set('q', query) : undefined;
    return this.http.get<Article[]>(this.baseUrl, { params });
  }

  getArticleById(articleId: number): Observable<Article> {
    return this.http.get<Article>(`${this.baseUrl}/${articleId}`);
  }

  changeQuantity(articleID: number, changeInQuantity: number): Observable<Article> {
    return this.http.patch<Article>(`${this.baseUrl}/${articleID}`, {
      changeInQuantity
    });
  }

  create(article: Article): Observable<Article> {
    return this.http.post<Article>(this.baseUrl, article);
  }
}
