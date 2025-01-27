import { Injectable } from '@angular/core';
// Gestion API
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { APIdataArticles } from '../../interface/api/apidata-articles';


@Injectable({
  providedIn: 'root'
})
export class ArticlesService {

  constructor(private http: HttpClient) { }

  getRecherche(searchText: any): Observable<APIdataArticles> {
    return this.http.get<APIdataArticles>('http://localhost:3000/api/article&recherche');

  }

  getStories() {
    return this.http.get('http://localhost:3000/api/article&stories');
  }

  getRecentArticle() {
    return this.http.get('http://localhost:3000/api/article&recent');
  }

  getVideo() {
    return this.http.get('http://localhost:3000/api/article&video');
  }

  getPopular() {
    return this.http.get('http://localhost:3000/api/article&popular');
  }

  setArticle(data: any) {
    return this.http.post('http://localhost:3000/api/article', data);
  }
}
