import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeComponent } from './home.component';
import { RechercheComponent } from '../recherche/recherche.component';
import { ArticleComponent } from '../article/article.component';
import { TopStoriesComponent } from '../top-stories/top-stories.component';
import { MostPopularComponent } from '../most-popular/most-popular.component';
import { TopVideoComponent } from '../top-video/top-video.component';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HomeComponent,
        RechercheComponent,
        ArticleComponent,
        TopStoriesComponent,
        MostPopularComponent,
        TopVideoComponent
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
