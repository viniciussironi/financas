import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ReceitaInterface } from '../interface/receitas-interface';
import { Observable } from 'rxjs';
import { Constants } from '../constant/constants';
import { TotalPorMesInterface } from '../interface/total_por_mes-interface';
import { Page } from '../interface/page-interface';

@Injectable({
  providedIn: 'root'
})
export class ReceitasService {

  private url = `${Constants.urlBackEnd}receitas`;

  constructor(private http: HttpClient) { }

  getReceitas(pageNumber:number, categoriaId: string, inicio: string, fim: string): Observable<Page<ReceitaInterface>> {
    let params = new HttpParams()
    .set('page', pageNumber)
    .set('size', 7)
    .set('idCategoria', categoriaId)
    .set('inicio', inicio)
    .set('fim', fim);

    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + localStorage.getItem('access_token')
    });

    return this.http.get<Page<ReceitaInterface>>(this.url, {params, headers});
  }

  getTotalPorMes(): Observable<TotalPorMesInterface[]> {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + localStorage.getItem('access_token')
    });

    return this.http.get<TotalPorMesInterface[]>(`${this.url}/totalPorMes`, {headers});
  }

  getTotalReceitas(): Observable<number> {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + localStorage.getItem('access_token')
    });

    return this.http.get<number>(`${this.url}/totalReceitas`, {headers});
  }
  
  getReceitaById(id: number): Observable<ReceitaInterface> {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + localStorage.getItem('access_token')
    });
    
    return this.http.get<ReceitaInterface>(this.url + '/' + id, {headers});
  } 

  insertReceita(receita: any) {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + localStorage.getItem('access_token')
    });

    return this.http.post<ReceitaInterface>(this.url, receita, {headers});
  }

  updateReceita(receita: any, id: number) {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + localStorage.getItem('access_token')
    });

    return this.http.put(`${this.url}/${id}`, receita, {headers});
  }

  deleteReceita(id: number) {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + localStorage.getItem('access_token')
    });
    
    return this.http.delete(`${this.url}/${id}`, {headers});
  }
}
