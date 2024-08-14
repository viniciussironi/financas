import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Constants } from '../constant/constants';
import { Observable } from 'rxjs';
import { UsuarioInterface } from '../interface/usuario-interface';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private url = `${Constants.urlBackEnd}usuario`;

  constructor(private http: HttpClient) { }

  getUsuarioLogado(): Observable<UsuarioInterface> {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + localStorage.getItem('access_token')
    });
    return this.http.get<UsuarioInterface>(this.url, {headers});
  }

  atualizarUsuario(usuario: any) {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + localStorage.getItem('access_token')
    });

    return this.http.put(this.url, usuario, {headers});
  }
}
