import { Routes } from '@angular/router';

import { HomeComponent } from './page/homepage/home/home.component';
import { LoginComponent } from './page/forms/login/login.component';
import { ArticleComponent } from './page/forms/article/article.component';
import { UserDetailComponent } from './page/user-detail/user-detail.component';
import { ArticleDetailComponent } from './page/article-detail/article-detail/article-detail.component';
import { ArticleModifComponent } from './page/article-detail/article-modif/article-modif.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'login', component: LoginComponent },
    { path: 'logout', component: LoginComponent },
    { path: 'register', component: LoginComponent },
    { path: 'create/article', component: ArticleComponent },
    { path: 'user', component: UserDetailComponent },
    { path: 'article/:id', component: ArticleDetailComponent },
    { path: 'article-modif/:id', component: ArticleModifComponent },
];
