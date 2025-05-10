import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { MenuComponent } from "./page/menu/menu.component";
import { NewsletterService } from './services/api_newsletter/newsletter.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MenuComponent,FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {

  constructor(private NewsletterServices:NewsletterService) {}

  title = 'fil_rouge';

    Mail: string = "";

    onSubmit() {  
  
      this.NewsletterServices.addNewUserToNewsletter(this.Mail).subscribe({
        next : (data) => {
          console.log(data)
          console.log("Création de l'utilisateur dans la newsletter avec success");
        },
        error : (error : any) => {
          console.log(error);
        },
        complete : () => {
          console.log('Requete Création d\'article terminée');
        }
      });
    }
  

}
