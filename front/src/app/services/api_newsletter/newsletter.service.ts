import { Injectable } from '@angular/core';
// Gestion API
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class NewsletterService {

  constructor(private http: HttpClient) { }

    addNewUserToNewsletter(email: string) {
      return this.http.post('http://localhost:3000/api/newsletter', {email: email});
   }
}
