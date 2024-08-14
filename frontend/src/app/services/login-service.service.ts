import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Constants } from '../constant/constants';

@Injectable({
  providedIn: 'root'
})
export class LoginServiceService {

  private url = `${Constants.urlBackEnd}oauth2/token`;

  constructor(private http: HttpClient) { }


  logar(username:string, password:string) {
    const body = new HttpParams()
    .set('username', username)
    .set('password', password)
    .set('grant_type', 'password');

  const headers = new HttpHeaders({
    'Content-Type': 'application/x-www-form-urlencoded',
    'Authorization': 'Basic ' + btoa('myclientid:myclientsecret')
  });

    return this.http.post(this.url, body, {headers})
  }

  estaLogado(): boolean {
    const token = localStorage.getItem('access_token');
    const tokenExpiresIn = localStorage.getItem('expires_in');
    const tokenIssuedAt = localStorage.getItem('issued_at');
    const dateNow = Date.now();
    const expiryDate = Number(tokenIssuedAt) + Number(tokenExpiresIn)

    if(dateNow > expiryDate) {
      return false;
    }

    if(token === '') {
      return false;
    }

    return true;
  }
}
