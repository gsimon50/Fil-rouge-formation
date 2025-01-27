import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ArticlesService } from '../../../services/api_articles/articles.service';



@Component({
  selector: 'app-article',
  imports: [FormsModule],
  templateUrl: './article.component.html',
  styleUrl: './article.component.scss'
})
export class ArticleComponent {

  
    constructor(private ArticlesService:ArticlesService) {}
  
    Title: string = "";
    Tag: string = "";
    Picture: string = "";
    Category: string = "";

    onSubmit() {
      const dataAPI = {
        Title: this.Title,
        Tag: this.Tag,
        Picture: this.Picture,
        Category: this.Category
      };
  
  
      this.ArticlesService.setArticle(dataAPI).subscribe({
        next : (data) => {
          console.log(data)
          console.log("Création d'article success");
        },
        error : (error : any) => {
          console.log(error);
        },
        complete : () => {
          console.log('Requete Création d\'article terminée');
        }
      });
    }
  
    ngOnInit() {
    }

}
