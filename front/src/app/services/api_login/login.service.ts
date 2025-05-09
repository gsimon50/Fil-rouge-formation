import { Injectable } from '@angular/core';

import { HttpClient,HttpParams  } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }

  setRegister(dataAPI: any){
    const httpParams = new HttpParams({ fromObject: dataAPI });
    return this.http.get('http://localhost:3000/register', { params: httpParams } );
  }

  getLogin(dataAPI: any): Observable<any> { 
    const httpParams = new HttpParams({ fromObject: dataAPI });
    console.log(httpParams)
    return this.http.get('http://localhost:3000/login',{ params: httpParams });
  }


}
