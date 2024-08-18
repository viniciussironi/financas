import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable, tap } from 'rxjs';

import { CategoriaReceitaService } from '../../../../services/categoria-receita.service';
import { ReceitasService } from '../../../../services/receitas.service';

import { CategoriaInterface } from '../../../../interface/categoria-interface';
import { ReceitaInterface } from '../../../../interface/receitas-interface';
import { AddMovimentacaoComponent } from "../../../../components/formularios/add-movimentacao/add-movimentacao.component";

@Component({
  selector: 'app-add-receita',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AddMovimentacaoComponent
],
  templateUrl: './add-receita.component.html',
  styleUrl: './add-receita.component.scss'
})
export class AddReceitaComponent implements OnInit {

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
  ) {}
  
  ngOnInit() {
    this.getCategorias();
  }
  
  getCategorias() {
    this.categoriaReceitaService.getCategoriasReceitas().subscribe(
      (listaCategoria: CategoriaInterface[]) => {
        this.listaCategoria = listaCategoria;
      });
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
  