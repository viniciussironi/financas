import { Component, OnInit } from '@angular/core';

import { DespesasService } from '../../../../services/despesas.service';
import { CategoriaDespesaService } from '../../../../services/categoria-despesa.service';

import { Page } from '../../../../interface/page-interface';
import { DespesaInterface } from '../../../../interface/despesas-interface';
import { TotalPorMesInterface } from '../../../../interface/total_por_mes-interface';
import { TotalPorCategoriaInterface } from '../../../../interface/total_por_categoria-interface';

import { BuscarComponent } from "../../../../components/movimentacao/gerais/buscar/buscar.component";
import { MovimentacaoPrincipalComponent } from "../../../../components/movimentacao/movimentacao-principal/movimentacao-principal.component";
import { CategoriaInterface } from '../../../../interface/categoria-interface';

@Component({
  selector: 'app-resumo',
  standalone: true,
  imports: [MovimentacaoPrincipalComponent, BuscarComponent],
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
  
  ngOnInit(): void {
    this.getDespesas(1);
    this.getCategorias();
    this.getTotalCategoriaDespesas(1);
    this.getTotalDespesas();
    this.getTotalPorMes(1);
  }
  
  getDespesas(userId: number) {
    this.despesaService.getDespesas(userId).subscribe(
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
}

