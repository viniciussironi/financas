import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable, tap } from 'rxjs';

import { CategoriaReceitaService } from '../../../../services/categoria-receita.service';
import { ReceitasService } from '../../../../services/receitas.service';

import { CategoriaInterface } from '../../../../interface/categoria-interface';
import { ReceitaInterface } from '../../../../interface/receitas-interface';

@Component({
  selector: 'app-add-receita',
  standalone: true,
  imports: [
    CommonModule, 
    ReactiveFormsModule,
  ],
  templateUrl: './add-receita.component.html',
  styleUrl: './add-receita.component.scss'
})
export class AddReceitaComponent implements OnInit {

  listaCategoria: CategoriaInterface[] = [];
  receita!: ReceitaInterface;
  id: string = '';

  formData = new FormControl();
  formValor = new FormControl();
  formCategoryId = new FormControl();
  
  constructor(
    private categoriaReceitaService: CategoriaReceitaService, 
    private receitaService: ReceitasService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id') || '';
    this.getCategorias();
    
    this.getReceitaById().subscribe(() => {
      if (this.receita) {
        this.formData.setValue(this.receita.data);
        this.formValor.setValue(String(this.receita.valor));
        this.formCategoryId.setValue(this.receita.categoria.id);
      }
    });

  }

  getCategorias() {
    this.categoriaReceitaService.getCategoriasReceitas().subscribe(
    (listaCategoria: CategoriaInterface[]) => {
      this.listaCategoria = listaCategoria;
    });
  }

  getReceitaById(): Observable<ReceitaInterface> {
    return this.receitaService.getReceitaById(Number(this.id)).pipe(
      tap((receita: ReceitaInterface) => {
        this.receita = receita;
      })
    );
  }

  insertReceita() {
    const receita = {
      data: this.formData.value,
      valor: this.formValor.value,
      categoria: { id: this.formCategoryId.value }
    };

    this.receitaService.insertReceita(receita).subscribe();
  }
}
