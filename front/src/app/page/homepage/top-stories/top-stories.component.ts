import { Component } from '@angular/core';
import { ArticlesService } from '../../../services/api_articles/articles.service';
import { CommonModule,JsonPipe } from '@angular/common';



@Component({
  selector: 'app-top-stories',
  imports: [JsonPipe,CommonModule],
  templateUrl: './top-stories.component.html',
  styleUrl: './top-stories.component.scss'
})
export class TopStoriesComponent {
  articles: any;
  constructor(private apiArticles: ArticlesService) { 
    this.apiArticles.getStories().subscribe({
      next : (data) => {
        this.articles = data;
      },
      error : (error : any) => {
        console.log(error);
      },
      complete : () => {
        console.log('Requete ApiArticle terminée');
      }

    });
  }
}
