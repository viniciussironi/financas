import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DespesasService } from '../../services/despesas.service';
import { CategoriaDespesaService } from '../../services/categoria-despesa.service';

import { DespesaInterface } from '../../interface/despesas-interface';
import { TotalPorCategoriaInterface } from '../../interface/total_por_categoria-interface';
import { TotalPorMesInterface } from '../../interface/total_por_mes-interface';

import { UltimasMovComponent } from '../../components/movimentacao/ultimas-mov/ultimas-mov.component';
import { TotalReceitaDespesaComponent } from "../../components/movimentacao/total-receita-despesa/total-receita-despesa.component";
import { HeaderDashbordComponent } from '../../components/comp-gerais/header-dashboard/header-app/header.component';
import { NavLateralComponent } from '../../components/comp-gerais/nav-bar-lateral-dashboard/nav-lateral-app/nav-lateral.component';
import { BtnAddMovimentacaoComponent } from '../../components/movimentacao/btn-add-movimentacao/btn-add-movimentacao.component';
import { TotalPorCategoriaComponent } from '../../components/movimentacao/por-categoria/total-por-categoria.component';
import { TotalUltimosMesesComponent } from '../../components/movimentacao/ultimos-meses/total-ultimos-meses.component';


@Component({
  selector: 'app-despesas',
  standalone: true,
  imports: [
    CommonModule, 
    UltimasMovComponent, 
    HeaderDashbordComponent, 
    TotalReceitaDespesaComponent, 
    NavLateralComponent, 
    BtnAddMovimentacaoComponent, 
    TotalPorCategoriaComponent, 
    TotalUltimosMesesComponent
  ],
  templateUrl: './despesas.component.html',
  styleUrl: './despesas.component.scss'
})
export class DespesasComponent implements OnInit {
  
  constructor(private despesaService: DespesasService , private categoriaDespesaService: CategoriaDespesaService) {}
  
  cor: string = "#F40808";
  totalDespesas: number = 0;
  totalPorMes: TotalPorMesInterface[] = [];
  despesas: DespesaInterface[] = [];
  totalPorCategoriaDespesa: TotalPorCategoriaInterface[] = [];

  ngOnInit(): void {
    this.getDespesas(1);
    this.getTotalCategoriaDespesas(1);
    this.getTotalDespesas();
    this.getTotalPorMes(1)
  }
  
  getDespesas(userId: number) {
    this.despesaService.getDespesas(userId).subscribe(
    (despesas: DespesaInterface[]) => {
    this.despesas = despesas;
    });
  }

  getTotalCategoriaDespesas(userId: number) {
    this.categoriaDespesaService.getTotalPorCategoriaDespesa(userId).subscribe(
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
    this.despesas.forEach(x => {
      this.totalDespesas += x.valor
    });
  }
}
