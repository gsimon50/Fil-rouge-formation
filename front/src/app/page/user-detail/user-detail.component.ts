import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { UserArticleComponent } from './user-article/user-article.component';

@Component({
  selector: 'app-user-detail',
  imports: [FormsModule, CommonModule, RouterModule, UserArticleComponent],
  templateUrl: './user-detail.component.html',
  styleUrl: './user-detail.component.scss'
})

export class UserDetailComponent {
  constructor(private http: HttpClient, private router: Router) { }
  email: string = "";
  password: string = "";
  isLoggedIn: boolean = false;
  user = {
    name: '',
    email: '',
    password: '',
    articles: []
  };

  ngOnInit(): void {
    // Charger l'état de connexion depuis le localStorage
    const storedLoginState = typeof window !== 'undefined' ? window.localStorage.getItem('isLoggedIn') : null;
    this.isLoggedIn = storedLoginState === 'true';
    this.email = typeof window !== 'undefined' ? window.localStorage.getItem('userName') || '' : '';

    // Si l'utilisateur est déjà connecté, rediriger vers la page d'accueil
    if (!this.isLoggedIn) {
      this.router.navigate(['/login']);
    }
  }

  onSubmit() {
    const userData = {
      name: this.user.name,
      email: this.user.email,
      password: this.user.password

    };

    this.http.post('/api/users', userData).subscribe(
      response => {
        console.log('User data submitted successfully:', response);
        alert('Utilisateur enregistré avec succès');
      },
      error => {
        console.error('Error submitting user data:', error);
        alert('Une erreur est survenue lors de l\'enregistrement');
      }
    );
  }

  updateUser<K extends keyof typeof this.user>(field: K, value: typeof this.user[K]) {
    this.user[field] = value;
  }
}
