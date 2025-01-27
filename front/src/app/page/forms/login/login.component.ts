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

  username: string = '';
  password: string = '';
  type: string = 'login';
  Title: string = 'Connexion';
  urlText: string = 'Premiere Connexion ?';
  url: string = 'register';
  cookieValue : string = "";
  onSubmit() {
    const dataAPI = {
      username: this.username,
      password: this.password,
      type: this.type
    };

    this.cookieValue = this.cookieService.get('user');


    if (this.type === 'register') {

      this.LoginService.setRegister(dataAPI).subscribe({
        next : (data) => {
          console.log(data)
          console.log("Register success");
        },
        error : (error : any) => {
          console.log(error);
        },
        complete : () => {
          console.log('Requete Register terminée');
        }
      });
    } else {
      this.LoginService.getLogin(dataAPI).subscribe({
        next : (data) => {
          console.log(data)
          console.log("Login success");
        },
        error : (error : any) => {
          console.log(error);
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

      console.log("this.cookieValue");
      console.log(this.cookieValue);
    }
  }
}
