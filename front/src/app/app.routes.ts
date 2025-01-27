import { Routes } from '@angular/router';

import { HomeComponent } from './page/homepage/home/home.component';
import { LoginComponent } from './page/forms/login/login.component';
import { ArticleComponent } from './page/forms/article/article.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: LoginComponent },
    { path: 'create/article', component: ArticleComponent },
];
