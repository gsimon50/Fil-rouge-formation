import { Injectable } from '@angular/core';
// Gestion API
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ArticlesService {

  constructor(private http: HttpClient) { }

  getRecherche(searchText: any) {
    console.log('coucou je suis ici')
    return this.http.get('http://localhost:3000/api/recherche');
  }
}
