import { Component } from '@angular/core';
import { ArticlesService } from '../../../services/api_articles/articles.service';
import { CommonModule,JsonPipe } from '@angular/common';

@Component({
  selector: 'app-most-popular',
  imports: [JsonPipe,CommonModule],
  templateUrl: './most-popular.component.html',
  styleUrl: './most-popular.component.scss'
})
export class MostPopularComponent {
  articles: any;
  constructor(private apiArticles: ArticlesService) { 
    this.apiArticles.getPopular().subscribe({
      next : (data) => {
        this.articles = data;
      },
      error : (error : any) => {
        console.log(error);
      },
      complete : () => {
        console.log('Requete ApiArticle de MostPopularComponent terminée');
      }
    });
  }
}
