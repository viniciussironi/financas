import { Injectable } from '@angular/core';
import { Constants } from '../constants';
import { HttpClient } from '@angular/common/http';
import { TotalPorCategoriaInterface } from '../interface/total_por_categoria-interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoriaDespesaService {
  
  private url = `${Constants.urlBackEnd}categoriaReceita`;

  constructor(private http: HttpClient) { }

  getTotalPorCategoriaDespesa(userId: number): Observable<TotalPorCategoriaInterface[]> {
    return this.http.get<TotalPorCategoriaInterface[]>(`${this.url}/total/${userId}`);
  }
}
