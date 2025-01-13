import { Component, SimpleChanges } from '@angular/core';
import { ArticlesService } from '../../../services/api_articles/articles.service';
import { ReactiveFormsModule, FormControl, FormsModule } from '@angular/forms';
import { Input } from '@angular/core';
import { debounceTime } from 'rxjs/operators';
@Component({
  selector: 'app-recherche',
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './recherche.component.html',
  styleUrl: './recherche.component.scss'
})
export class RechercheComponent {
  
  search = new FormControl<string>('');
  constructor(private apiArticles: ArticlesService) { 
    
    this.search.valueChanges.pipe(
      debounceTime(300)
    ).subscribe(query => {
      this.apiArticles.getRecherche(this.search.value).subscribe((data) => {
        console.log(data)
      });
    });

  }

  
  ngOnChanges(changes : SimpleChanges) : void {
    if(changes['search']) {
      console.log(this.search);
      this.apiArticles.getRecherche("").subscribe((data) => {
        console.log(data);
      });
    }
  }

}
