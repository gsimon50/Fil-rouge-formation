import { Component } from '@angular/core';
import { ArticlesService } from '../../../services/api_articles/articles.service';
import { CommonModule } from '@angular/common';
import { ValueChangeEvent } from '@angular/forms';


@Component({
  selector: 'app-article-detail',
  imports: [CommonModule],
  templateUrl: './article-detail.component.html',
  styleUrl: './article-detail.component.scss'
})
export class ArticleDetailComponent {

  detailArticles: any;
  isLoggedIn: string = localStorage.getItem('isLoggedIn') || '';
    constructor(private apiArticles: ArticlesService) { 
      // Récupération de l'ID de l'article à partir de l'URL
      const url = window.location.href;
      const idArticle = url.substring(url.lastIndexOf('/') + 1);
      this.apiArticles.getArticleDetail(idArticle).subscribe({
        next : (data) => {
          this.detailArticles = data;
        },
        error : (error : any) => {
          console.log(error);
        },
        complete : () => {
          console.log('Requete ApiArticle terminée');
        }
  
      });
    }

    ajouterContenu(){
      // redirige vers article-modif 
      const url = window.location.href;
      const idArticle = url.substring(url.lastIndexOf('/') + 1);
      window.location.href = '/article-modif/' + idArticle;
    }

}
