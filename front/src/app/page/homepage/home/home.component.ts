import { Component } from '@angular/core';
import { RechercheComponent } from "../recherche/recherche.component";
import { TopStoriesComponent } from "../top-stories/top-stories.component";
import { TopVideoComponent } from "../top-video/top-video.component";
import { ArticleComponent } from "../article/article.component";
import { MostPopularComponent } from "../most-popular/most-popular.component";
import { MenuComponent } from "../../menu/menu.component";

@Component({
  selector: 'app-home',
  imports: [
    RechercheComponent, 
    TopStoriesComponent, 
    TopVideoComponent, 
    ArticleComponent, 
    MostPopularComponent,
    MenuComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  Title = "Hey, we're blogxpress. See our thoughts, stories and ideas.";

}
