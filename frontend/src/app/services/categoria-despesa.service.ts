import { Injectable } from '@angular/core';
import { Constants } from '../constant/constants';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { TotalPorCategoriaInterface } from '../interface/total_por_categoria-interface';
import { Observable } from 'rxjs';
import { CategoriaInterface } from '../interface/categoria-interface';

@Injectable({
  providedIn: 'root'
})
export class CategoriaDespesaService {
  
  private url = `${Constants.urlBackEnd}categoriaDespesa`;

  constructor(private http: HttpClient) { }

  getCategoriasDespesas(): Observable<CategoriaInterface[]> {
    return this.http.get<CategoriaInterface[]>(this.url);
  }

  getTotalPorCategoriaDespesa(): Observable<TotalPorCategoriaInterface[]> {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + localStorage.getItem('access_token')
    });
    
    return this.http.get<TotalPorCategoriaInterface[]>(`${this.url}/total`, {headers});
  }
}
