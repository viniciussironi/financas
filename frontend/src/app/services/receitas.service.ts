import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ReceitaInterface } from '../interface/receitas-interface';
import { Observable } from 'rxjs';
import { Constants } from '../constants';

@Injectable({
  providedIn: 'root'
})
export class ReceitasService {

  private url = `${Constants.urlBackEnd}receitas`;

  constructor(private http: HttpClient) { }

  getReceitas(userId: number): Observable<ReceitaInterface[]> {
    return this.http.get<ReceitaInterface[]>(`${this.url}/${userId}`);
  }

  insertReceita(receita: ReceitaInterface) {
    return this.http.post(this.url, receita);
  }

  updateReceita(receita: ReceitaInterface, id: number) {
    return this.http.put(`${this.url}/${id}`, receita);
  }

  deleteReceita(id: number) {
    return this.http.delete(`${this.url}/${id}`);
  }
}
