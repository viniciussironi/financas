import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ReceitaInterface } from '../interface/receitas-interface';
import { Observable } from 'rxjs';
import { Constants } from '../constants';
import { TotalPorMesInterface } from '../interface/total_por_mes-interface';
import { Page } from '../interface/page-interface';

@Injectable({
  providedIn: 'root'
})
export class ReceitasService {

  private url = `${Constants.urlBackEnd}receitas`;

  constructor(private http: HttpClient) { }

  getReceitas(userId: number): Observable<Page<ReceitaInterface>> {
    return this.http.get<Page<ReceitaInterface>>(`${this.url}/${userId}`);
  }

  getTotalPorMes(userId: number): Observable<TotalPorMesInterface[]> {
    return this.http.get<TotalPorMesInterface[]>(`${this.url}/totalPorMes/${userId}`);
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
