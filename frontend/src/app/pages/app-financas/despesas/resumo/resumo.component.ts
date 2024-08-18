import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { DespesasService } from '../../../../services/despesas.service';
import { CategoriaDespesaService } from '../../../../services/categoria-despesa.service';

import { Page } from '../../../../interface/page-interface';
import { DespesaInterface } from '../../../../interface/despesas-interface';
import { TotalPorMesInterface } from '../../../../interface/total_por_mes-interface';
import { TotalPorCategoriaInterface } from '../../../../interface/total_por_categoria-interface';
import { CategoriaInterface } from '../../../../interface/categoria-interface';

import { TotalReceitaDespesaComponent } from "../../../../components/movimentacao/total-receita-despesa/total-receita-despesa.component";
import { BtnAddMovimentacaoComponent } from "../../../../components/movimentacao/btn-add-movimentacao/btn-add-movimentacao.component";
import { TotalPorCategoriaComponent } from "../../../../components/movimentacao/por-categoria/total-por-categoria.component";
import { TotalUltimosMesesComponent } from "../../../../components/movimentacao/ultimos-meses/total-ultimos-meses.component";
import { BuscarComponent } from "../../../../components/movimentacao/buscar/buscar.component";
import { UltimasMovimentacoesDespesaComponent } from "../../../../components/movimentacao/ultimas-movimentacoes-despesa/ultimas-movimentacoes-despesa.component";
import { MovimentacaoClass } from '../../../../classes/movimentacao-class';

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
    UltimasMovimentacoesDespesaComponent
],
  templateUrl: './resumo.component.html',
  styleUrl: './resumo.component.scss'
})
export class ResumoDespesasComponent implements OnInit {
  
  constructor(private despesaService: DespesasService, private categoriadespesaService: CategoriaDespesaService) {}
  
  cor: string = "#F40808";
  totalDespesas: number = 0;
  selectedPage: number = 0;
  
  despesas: Page<DespesaInterface> = { content: [], totalPages: 0, number: 0 };
  categorias: CategoriaInterface[] = [];
  totalPorMes: TotalPorMesInterface[] = [];
  totalPorCategoriaDespesa: TotalPorCategoriaInterface[] = [];

  formCategoryId = new FormControl('');
  formInicio = new FormControl('');
  formFim = new FormControl('');
  
  ngOnInit(): void {
    this.getDespesas(0, '', '', '');
    this.getCategorias();
    this.getTotalCategoriaDespesas();
    this.getTotalDespesas();
    this.getTotalPorMes();
    console.log('ngOnInit')
    console.log(this.despesas)
  }
  
  getDespesas(pageNumber:number, categoriaId: string, inicio: string, fim: string) {
    return this.despesaService.getDespesas(pageNumber, categoriaId, inicio, fim).subscribe(
    (despesas: Page<DespesaInterface>) => {
      this.despesas = despesas;
    });
  }

  getCategorias() {
    this.categoriadespesaService.getCategoriasDespesas().subscribe(
    (categorias: CategoriaInterface[]) => {
      this.categorias = categorias;
    })
  }

  getTotalCategoriaDespesas() {
    this.categoriadespesaService.getTotalPorCategoriaDespesa().subscribe(
    (totalPorCategoriaDespesa: TotalPorCategoriaInterface[]) => {
      this.totalPorCategoriaDespesa = totalPorCategoriaDespesa;
    });
  }

  getTotalPorMes() {
    this.despesaService.getTotalPorMes().subscribe(
    (totalPorMes: TotalPorMesInterface[]) => {
      this.totalPorMes = totalPorMes;
    });
  }

  getTotalDespesas() {
    this.despesaService.getTotalDespesas().subscribe(
    (total: number) => {
    this.totalDespesas = total;
    });
  }

  delete(id: number) {
    this.despesaService.deleteDespesa(id).subscribe(
      () => {
        this.getDespesas(this.despesas.number, '', '', '');
        this.getCategorias();
        this.getTotalCategoriaDespesas();
        this.getTotalDespesas();
        this.getTotalPorMes();
      }
    );
  }

  onSubmit() {
    this.getDespesas(0, String(this.formCategoryId.value), String(this.formInicio.value), String(this.formFim.value));
  }

  resetFilters() {
    this.formCategoryId.setValue('');
    this.formInicio.setValue('');
    this.formFim.setValue('');
    this.getDespesas(0, '', '', '');
  }

  nextPage() {
    if (this.despesas.number < this.despesas.totalPages - 1) {
      this.despesas.number++;
      this.selectedPage = this.despesas.number;
      this.getDespesas(this.despesas.number, String(this.formCategoryId.value), String(this.formInicio.value), String(this.formFim.value));
    }
  }

  backPage() {
    if (this.despesas.number > 0) {
      this.despesas.number --;
      this.selectedPage = this.despesas.number;
      this.getDespesas(this.despesas.number, String(this.formCategoryId.value), String(this.formInicio.value), String(this.formFim.value));
    }
  }
}