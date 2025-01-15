import { Component, SimpleChanges } from '@angular/core';
import { ArticlesService } from '../../../services/api_articles/articles.service';
import { ReactiveFormsModule, FormControl, FormsModule } from '@angular/forms';
import { Input } from '@angular/core';
import { debounceTime } from 'rxjs/operators';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-recherche',
  imports: [FormsModule, ReactiveFormsModule,JsonPipe],
  templateUrl: './recherche.component.html',
  styleUrl: './recherche.component.scss'
})
export class RechercheComponent {

  search = new FormControl<string>('');
  results: any;
  constructor(private apiArticles: ArticlesService) { 
    
    this.search.valueChanges.pipe(
      debounceTime(1000)
    ).subscribe(query => {
      this.apiArticles.getRecherche(this.search.value).subscribe((data) => {
        console.log(data)
        //let result = data.results
        this.results = data;
      });
    });

  }
}
