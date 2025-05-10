import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticleModifComponent } from './article-modif.component';

describe('ArticleModifComponent', () => {
  let component: ArticleModifComponent;
  let fixture: ComponentFixture<ArticleModifComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ArticleModifComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ArticleModifComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
