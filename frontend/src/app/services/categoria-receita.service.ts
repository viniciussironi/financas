import { Injectable } from '@angular/core';
import { Constants } from '../constants';
import { HttpClient } from '@angular/common/http';
import { TotalPorCategoriaInterface } from '../interface/total_por_categoria-interface';
import { Observable } from 'rxjs';
import { CategoriaInterface } from '../interface/categoria-interface';

@Injectable({
  providedIn: 'root'
})
export class CategoriaReceitaService {
  
  private url = `${Constants.urlBackEnd}categoriaReceita`;

  constructor(private http: HttpClient) { }

  getCategoriasReceitas(): Observable<CategoriaInterface[]> {
    return this.http.get<CategoriaInterface[]>(this.url);
  }

  getTotalPorCategoriaReceita(userId: number): Observable<TotalPorCategoriaInterface[]> {
    return this.http.get<TotalPorCategoriaInterface[]>(`${this.url}/total/${userId}`);
  }
}
