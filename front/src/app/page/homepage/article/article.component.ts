import { Component } from '@angular/core';
import { ArticlesService } from '../../../services/api_articles/articles.service';
import { CommonModule,JsonPipe } from '@angular/common';

@Component({
  selector: 'app-article',
  imports: [JsonPipe,CommonModule],
  templateUrl: './article.component.html',
  styleUrl: './article.component.scss'

})
export class ArticleComponent {
  articles: any;
    constructor(private apiArticles: ArticlesService) { 
      this.apiArticles.getRecentArticle().subscribe({
        next : (data) => {
          console.log(data);
          this.articles = data;
        },
        error : (error : any) => {
          console.log(error);
        },
        complete : () => {
          console.log('Requete ApiArticle de ArticleComponent terminée');
        }
  
      });
    }

}
