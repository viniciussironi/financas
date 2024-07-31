import { Injectable } from '@angular/core';
import { Constants } from '../constants';
import { HttpClient, HttpParams } from '@angular/common/http';
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

  getDespesas(pageNumber: number, categoriaId: string, inicio: string, fim: string): Observable<Page<DespesaInterface>> {
    let params = new HttpParams()
    .set('page', pageNumber)
    .set('size', 7)
    .set('categoriaId', categoriaId)
    .set('inicio', inicio)
    .set('fim', fim);

    return this.http.get<Page<DespesaInterface>>(this.url, {params});
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
