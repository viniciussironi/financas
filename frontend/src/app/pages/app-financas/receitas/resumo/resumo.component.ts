import { Component, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { TotalPorCategoriaInterface } from '../../../../interface/total_por_categoria-interface';
import { Page } from '../../../../interface/page-interface';
import { ReceitaInterface } from '../../../../interface/receitas-interface';
import { TotalPorMesInterface } from '../../../../interface/total_por_mes-interface';
import { CategoriaInterface } from '../../../../interface/categoria-interface';

import { ReceitasService } from '../../../../services/receitas.service';
import { CategoriaReceitaService } from '../../../../services/categoria-receita.service';

import { TotalReceitaDespesaComponent } from "../../../../components/movimentacao/total-receita-despesa/total-receita-despesa.component";
import { BtnAddMovimentacaoComponent } from "../../../../components/movimentacao/btn-add-movimentacao/btn-add-movimentacao.component";
import { TotalPorCategoriaComponent } from "../../../../components/movimentacao/por-categoria/total-por-categoria.component";
import { TotalUltimosMesesComponent } from "../../../../components/movimentacao/ultimos-meses/total-ultimos-meses.component";
import { BuscarComponent } from "../../../../components/movimentacao/buscar/buscar.component";
import { UltimasMovimentacoesReceitaComponent } from "../../../../components/movimentacao/ultimas-movimentacoes-receita/ultimas-movimentacoes-receita.component";
@Component({
  selector: 'app-resumo',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    RouterModule,
    TotalReceitaDespesaComponent,
    BtnAddMovimentacaoComponent,
    TotalPorCategoriaComponent,
    TotalUltimosMesesComponent,
    BuscarComponent,
    UltimasMovimentacoesReceitaComponent,
],
  templateUrl: './resumo.component.html',
  styleUrl: './resumo.component.scss'
})
export class ResumoReceitasComponent implements OnInit {
  
  constructor(private receitaService: ReceitasService, private categoriaReceitaService: CategoriaReceitaService) {}
  
  cor: string = "#06894A";
  totalReceitas: number = 0;
  selectedPage: number = 0;

  receitas: Page<ReceitaInterface> = { content: [], totalPages: 0, number: 0 };
  categorias: CategoriaInterface[] = [];
  totalPorMes: TotalPorMesInterface[] = [];
  totalPorCategoriaReceita: TotalPorCategoriaInterface[] = [];


  formCategoryId = new FormControl('');
  formInicio = new FormControl('');
  formFim = new FormControl('');
  
  ngOnInit() {
    this.getReceitas(0, '', '', '');
    this.getCategorias(); 
    this.getTotalCategoriaReceitas();
    this.getTotalReceitas();
    this.getTotalPorMes();
  }
  
  getReceitas(pageNumber:number, categoriaId: string, inicio: string, fim: string) {
    this.receitaService.getReceitas(pageNumber, categoriaId, inicio, fim).subscribe(
    (receitas: Page<ReceitaInterface>) => {
      this.receitas = receitas;
    })
  }

  getCategorias() {
    this.categoriaReceitaService.getCategoriasReceitas().subscribe(
    (categorias: CategoriaInterface[]) => {
      this.categorias = categorias;
    })
  }

  getTotalCategoriaReceitas() {
    this.categoriaReceitaService.getTotalPorCategoriaReceita().subscribe(
    (totalPorCategoriaReceita: TotalPorCategoriaInterface[]) => {
    this.totalPorCategoriaReceita = totalPorCategoriaReceita;
    });
  }

  getTotalPorMes() {
    this.receitaService.getTotalPorMes().subscribe(
    (totalPorMes: TotalPorMesInterface[]) => {
    this.totalPorMes = totalPorMes;
    });
  }

  getTotalReceitas() {
    this.receitaService.getTotalReceitas().subscribe(
      (total: number) => {
        this.totalReceitas = total;
      })
  }

  delete(id: number) {
    this.receitaService.deleteReceita(id).subscribe(
      () => {
        this.getReceitas(this.receitas.number, '', '', '');
        this.getCategorias(); 
        this.getTotalCategoriaReceitas();
        this.getTotalReceitas();
        this.getTotalPorMes();
      }
    );
  }

  onSubmit() {
    this.getReceitas(0, String(this.formCategoryId.value), String(this.formInicio.value), String(this.formFim.value));
  }

  resetFilters() {
    this.formCategoryId.setValue('');
    this.formInicio.setValue('');
    this.formFim.setValue('');
    this.getReceitas(0, '', '', '');
  }

  nextPage() {
    if (this.receitas.number < this.receitas.totalPages - 1) {
      this.receitas.number++;
      this.selectedPage = this.receitas.number;
      this.getReceitas(this.receitas.number, String(this.formCategoryId.value), String(this.formInicio.value), String(this.formFim.value));
    }
  }

  backPage() {
    if (this.receitas.number > 0) {
      this.receitas.number --;
      this.selectedPage = this.receitas.number;
      this.getReceitas(this.receitas.number, String(this.formCategoryId.value), String(this.formInicio.value), String(this.formFim.value));
    }
  }
}
