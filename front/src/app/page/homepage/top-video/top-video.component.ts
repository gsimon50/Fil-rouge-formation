import { Component } from '@angular/core';
import { ArticlesService } from '../../../services/api_articles/articles.service';
import { CommonModule,JsonPipe } from '@angular/common';

@Component({
  selector: 'app-top-video',
  imports: [JsonPipe,CommonModule],
  templateUrl: './top-video.component.html',
  styleUrl: './top-video.component.scss'
})
export class TopVideoComponent {
  articles: any;
  constructor(private apiArticles: ArticlesService) { 
    this.apiArticles.getRecentArticle().subscribe({
      next : (data) => {
        this.articles = data;
      },
      error : (error : any) => {
        console.log(error);
      },
      complete : () => {
        console.log('Requete ApiArticle de TopVideoComponent terminée');
      }
    });
  }
}
