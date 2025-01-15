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
    return this.http.get<APIdataArticles>('http://localhost:3000/api/recherche');
  }
}
