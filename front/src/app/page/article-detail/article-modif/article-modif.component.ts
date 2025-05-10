import { Component } from '@angular/core';
import { ArticlesService } from '../../../services/api_articles/articles.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-article-modif',
  imports: [FormsModule],
  templateUrl: './article-modif.component.html',
  styleUrl: './article-modif.component.scss'
})
export class ArticleModifComponent {
  texte : string = "";
  detailArticles: any;
  isLoggedIn: string = localStorage.getItem('isLoggedIn') || '';
  
  url = window.location.href;
  idArticle = this.url.substring(this.url.lastIndexOf('/') + 1);
  constructor(private apiArticles: ArticlesService) { 
    // Récupération de l'ID de l'article à partir de l'URL
  }

  onSubmit(){
    this.apiArticles.setArticleDetail(this.texte,this.idArticle).subscribe({
      next : (data) => {
        this.detailArticles = data;
        alert('Article as ajouté du contenu avec succès');
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
