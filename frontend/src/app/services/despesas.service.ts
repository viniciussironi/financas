import { Injectable } from '@angular/core';
import { Constants } from '../constants';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ReceitaInterface } from '../interface/receitas-interface';
import { DespesaInterface } from '../interface/despesas-interface';
import { TotalPorMesInterface } from '../interface/total_por_mes-interface';

@Injectable({
  providedIn: 'root'
})
export class DespesasService {
  
  private url = `${Constants.urlBackEnd}despesas`;

  constructor(private http: HttpClient) { }

  getDespesas(userId: number): Observable<DespesaInterface[]> {
    return this.http.get<DespesaInterface[]>(`${this.url}/${userId}`);
  }

  getTotalPorMes(userId: number): Observable<TotalPorMesInterface[]> {
    return this.http.get<TotalPorMesInterface[]>(`${this.url}/totalPorMes/${userId}`);
  }


  insertDespesa(despesa: any) {
    return this.http.post(this.url, despesa)
  }

  updateDespesa(despesa: any, id: number) {
      return this.http.put(`${this.url}/${id}`, despesa);
  }

  deleteDespesa(id: number) {
        return this.http.delete(`${this.url}/${id}`)
  }
}
