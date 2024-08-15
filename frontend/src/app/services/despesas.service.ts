import { Injectable } from '@angular/core';
import { Constants } from '../constant/constants';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DespesaInterface } from '../interface/despesas-interface';
import { TotalPorMesInterface } from '../interface/total_por_mes-interface';
import { Page } from '../interface/page-interface';
import { DespesaAtualizarInterface } from '../interface/despesa_atualizar-interface';

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
    .set('idCategoria', categoriaId)
    .set('inicio', inicio)
    .set('fim', fim);

    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + localStorage.getItem('access_token')
    });

    return this.http.get<Page<DespesaInterface>>(this.url, {params, headers});
  }

  getTotalPorMes(): Observable<TotalPorMesInterface[]> {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + localStorage.getItem('access_token')
    });

    return this.http.get<TotalPorMesInterface[]>(`${this.url}/totalPorMes`, {headers});
  }

  getTotalDespesas(): Observable<number> {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + localStorage.getItem('access_token')
    });

    return this.http.get<number>(`${this.url}/totalDespesas`, {headers});
  }

  getDespesaById(id: number): Observable<DespesaAtualizarInterface> {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + localStorage.getItem('access_token')
    });
    
    return this.http.get<DespesaAtualizarInterface>(this.url + '/' + id, {headers});
  } 

  insertDespesa(despesa: any) {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + localStorage.getItem('access_token')
    });

    return this.http.post(this.url, despesa, {headers})
  }

  updateDespesa(despesa: any, id: number) {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + localStorage.getItem('access_token')
    });

    return this.http.put(`${this.url}/${id}`, despesa, {headers});
  }

  deleteDespesa(id: number) {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + localStorage.getItem('access_token')
    });
    
    return this.http.delete(`${this.url}/${id}`, {headers});
  }
}
