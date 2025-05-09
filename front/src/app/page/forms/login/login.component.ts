import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Router } from '@angular/router';
import { LoginService } from '../../../services/api_login/login.service';
import { CookieService } from 'ngx-cookie-service';



@Component({
  selector: 'app-login',
  imports: [FormsModule,RouterLink],
  providers: [CookieService],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  constructor(private router: Router, private LoginService:LoginService,private cookieService: CookieService) {}

  email: string = '';
  password: string = '';
  type: string = 'login';
  Title: string = 'Connexion';
  urlText: string = 'Premiere Connexion ?';
  url: string = 'register';
  cookieValue : string = "";
  logged : string = "";

  onSubmit() {
    const dataAPI = {
      email: this.email,
      password: this.password,
      type: this.type
    };

    this.cookieValue = this.cookieService.get('user');

    this.logged = localStorage.getItem('isLoggedIn') || '';

    if (this.logged === 'true') {
      this.router.navigate(['/home']);
    }

    if (this.type === 'register') {

      this.LoginService.setRegister(dataAPI).subscribe({
        next : (data) => {
          localStorage.setItem('isLoggedIn', 'true');
          localStorage.setItem('userName', this.email);
          this.router.navigate(['/user']);

        },
        error : (error : any) => {
          if (error.status === 409) {
            alert('Email existe déjà');
          } else if (error.status === 500) {
            console.log('Server error');
          } else {
            console.log('Unknown error');
          }
        },
        complete : () => {
          console.log('Requete Register terminée');
        }
      });
    } else {
      this.LoginService.getLogin(dataAPI).subscribe({
        next : (data) => {
            localStorage.setItem('isLoggedIn', 'true');
            localStorage.setItem('userName', this.email);
            this.router.navigate(['/user']);
        },
        error : (error : any) => {
          alert('Email ou mot de passe incorrect');
        },
        complete : () => {
          console.log('Requete Login terminée');
        }
      });

    }
  }

  ngOnInit() {
    if (this.router.url === '/register') {
      this.type = 'register';
      this.Title = 'Création de compte';
      this.urlText = 'Déjà inscrit ?';
      this.url = 'login';
      this.logged = localStorage.getItem('isLoggedIn') || '';
    }

    if (this.router.url === '/logout') {
      localStorage.removeItem('isLoggedIn');
      localStorage.removeItem('userName');
      this.router.navigate(['/login']);
    }
  }
}
