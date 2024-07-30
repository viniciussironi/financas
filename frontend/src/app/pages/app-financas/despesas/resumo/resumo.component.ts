import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

import { DespesasService } from '../../../../services/despesas.service';
import { CategoriaDespesaService } from '../../../../services/categoria-despesa.service';

import { Page } from '../../../../interface/page-interface';
import { DespesaInterface } from '../../../../interface/despesas-interface';
import { TotalPorMesInterface } from '../../../../interface/total_por_mes-interface';
import { TotalPorCategoriaInterface } from '../../../../interface/total_por_categoria-interface';
import { CategoriaInterface } from '../../../../interface/categoria-interface';

import { MovimentacaoPrincipalComponent } from "../../../../components/movimentacao/movimentacao-principal/movimentacao-principal.component";

@Component({
  selector: 'app-resumo',
  standalone: true,
  imports: [MovimentacaoPrincipalComponent, ReactiveFormsModule, CommonModule],
  templateUrl: './resumo.component.html',
  styleUrl: './resumo.component.scss'
})
export class ResumoDespesasComponent implements OnInit {
  
  constructor(private despesaService: DespesasService, private categoriadespesaService: CategoriaDespesaService) {}
  
  cor: string = "#F40808";
  totalDespesas: number = 0;
  despesas: Page<DespesaInterface> = { content: [], totalPages: 0, number: 0 };
  categorias: CategoriaInterface[] = [];
  totalPorMes: TotalPorMesInterface[] = [];
  totalPorCategoriaDespesa: TotalPorCategoriaInterface[] = [];

  formCategoryId = new FormControl('');
  formInicio = new FormControl('');
  formFim = new FormControl('');
  
  ngOnInit(): void {
    this.getDespesas(1, '', '', '');
    this.getCategorias();
    this.getTotalCategoriaDespesas(1);
    this.getTotalDespesas();
    this.getTotalPorMes(1);
  }
  
  getDespesas(userId: number, categoriaId: string, inicio: string, fim: string) {
    this.despesaService.getDespesas(userId, categoriaId, inicio, fim).subscribe(
    (despesas: Page<DespesaInterface>) => {
      this.despesas = despesas;
    })
  }

  getCategorias() {
    this.categoriadespesaService.getCategoriasDespesas().subscribe(
    (categorias: CategoriaInterface[]) => {
      this.categorias = categorias;
    })
  }

  getTotalCategoriaDespesas(userId: number) {
    this.categoriadespesaService.getTotalPorCategoriaDespesa(userId).subscribe(
    (totalPorCategoriaDespesa: TotalPorCategoriaInterface[]) => {
    this.totalPorCategoriaDespesa = totalPorCategoriaDespesa;
    });
  }

  getTotalPorMes(userId: number) {
    this.despesaService.getTotalPorMes(userId).subscribe(
    (totalPorMes: TotalPorMesInterface[]) => {
    this.totalPorMes = totalPorMes;
    });
  }

  getTotalDespesas() {
    this.despesas.content.forEach(x => {
      this.totalDespesas += x.valor
    });
  }

  onSubmit(event: Event) {
    event.preventDefault();
    console.log(this.formCategoryId)
    this.getDespesas(1, String(this.formCategoryId.value), String(this.formInicio.value), String(this.formFim.value));
  }

  resetFilters() {
    this.formCategoryId.setValue('');
    this.formInicio.setValue('');
    this.formFim.setValue('');
    this.getDespesas(1, '', '', '');
  }
}

