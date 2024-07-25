import { Injectable } from '@angular/core';
import { Constants } from '../constants';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DespesaInterface } from '../interface/despesas-interface';
import { TotalPorMesInterface } from '../interface/total_por_mes-interface';
import { Page } from '../interface/page-interface';

@Injectable({
  providedIn: 'root'
})
export class DespesasService {
  
  private url = `${Constants.urlBackEnd}despesas`;

  constructor(private http: HttpClient) { }

  getDespesas(userId: number): Observable<Page<DespesaInterface>> {
    return this.http.get<Page<DespesaInterface>>(`${this.url}/${userId}`);
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
