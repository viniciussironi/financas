import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable, tap } from 'rxjs';

import { CategoriaReceitaService } from '../../../../services/categoria-receita.service';
import { ReceitasService } from '../../../../services/receitas.service';

import { CategoriaInterface } from '../../../../interface/categoria-interface';
import { ReceitaInterface } from '../../../../interface/receitas-interface';
import { AddMovimentacaoComponent } from "../../../../components/formularios/add-movimentacao/add-movimentacao.component";

@Component({
  selector: 'app-edit-receita',
  standalone: true,
  imports: [AddMovimentacaoComponent],
  templateUrl: './edit-receita.component.html',
  styleUrl: './edit-receita.component.scss'
})
export class EditReceitaComponent implements OnInit {

  listaCategoria: CategoriaInterface[] = [];
  receita!: ReceitaInterface;
  id: string = '';
  tituloPagina = 'Adicionar receita';
  textButton = 'Adicionar'

  
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
        this.tituloPagina = 'Editar receita';
        this.textButton = 'Editar';
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
  
  updateReceita() {
    const receita = {
      data: this.formData.value,
      valor: this.formValor.value,
      categoria: { id: this.formCategoryId.value }
    };
    
    this.receitaService.updateReceita(receita, Number(this.id)).subscribe();
  }
}
