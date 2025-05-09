import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ArticlesService } from '../../../services/api_articles/articles.service';


@Component({
  selector: 'app-user-article',
  imports: [RouterOutlet, CommonModule],
  templateUrl: './user-article.component.html',
  styleUrl: './user-article.component.scss'
})
export class UserArticleComponent {
    articlesUser: any;
    id: any = localStorage.getItem('userId');
    constructor(private apiArticles: ArticlesService) { 
        setTimeout(() => {
            this.apiArticles.getArticleFromUser(this.id).subscribe({
                next : (data) => {
                    console.log(data);
                    this.articlesUser = data;
                },
                error : (error : any) => {
                    console.log(error);
                },
                complete : () => {
                    console.log('Requete ApiArticle de UserArticleComponent terminée');
                }
            });
        },1000);
    }

}
