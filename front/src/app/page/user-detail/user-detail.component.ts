import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-user-detail',
  imports: [FormsModule, CommonModule],
  templateUrl: './user-detail.component.html',
  styleUrl: './user-detail.component.scss'
})
export class UserDetailComponent {

  constructor(private http: HttpClient) {}
  email: string = "";
  password: string = "";
  isLoggedIn: boolean = false;



  ngOnInit(): void {
    // Charger l'état de connexion depuis le localStorage
    const storedLoginState = localStorage.getItem('isLoggedIn');
    this.isLoggedIn = storedLoginState === 'true';
    this.email = localStorage.getItem('userName') || '';
  }

  onLogin(): void {
    if (this.email && this.password) {
      this.http.post('https://your-api-endpoint.com/login', {
        email: this.email,
        password: this.password
        
      }).subscribe({
        next : (response) => {
          this.isLoggedIn = true;
          localStorage.setItem('isLoggedIn', 'true');
          localStorage.setItem('userName', this.email);        
        },
        error : (error : any) => {
          alert('Invalid credentials');
        },
        complete : () => {
          console.log('Requete ApiArticle terminée');
        }
      });
    }
  }

  onLogout(): void {
    this.isLoggedIn = false;
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userName');
  }


}
