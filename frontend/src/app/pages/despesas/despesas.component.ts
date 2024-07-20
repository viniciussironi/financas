import { Component, OnInit } from '@angular/core';
import { UltimasMovComponent } from '../../components/movimentacao/ultimas-mov/ultimas-mov.component';
import { HeaderDashbordComponent } from '../../components/dashboard/header/header/header.component';
import { CommonModule } from '@angular/common';
import { DespesasService } from '../../services/despesas.service';
import { DespesaInterface } from '../../interface/despesas-interface';
import { CategoriaDespesaService } from '../../services/categoria-despesa.service';
import { TotalPorCategoriaInterface } from '../../interface/total_por_categoria-interface';
import { TotalReceitaDespesaComponent } from "../../components/movimentacao/total-receita-despesa/total-receita-despesa.component";
import { NavLateralComponent } from "../../components/dashboard/nav/nav-lateral/nav-lateral.component";
import { BtnAddMovimentacaoComponent } from "../../components/movimentacao/btn-add-movimentacao/btn-add-movimentacao.component";
import { TotalPorCategoriaComponent } from "../../components/movimentacao/total-por-categoria/total-por-categoria.component";
import { TotalUltimosMesesComponent } from "../../components/movimentacao/total-ultimos-meses/total-ultimos-meses.component";

@Component({
  selector: 'app-despesas',
  standalone: true,
  imports: [UltimasMovComponent, HeaderDashbordComponent, CommonModule, TotalReceitaDespesaComponent, NavLateralComponent, BtnAddMovimentacaoComponent, TotalPorCategoriaComponent, TotalUltimosMesesComponent],
  templateUrl: './despesas.component.html',
  styleUrl: './despesas.component.scss'
})
export class DespesasComponent implements OnInit {
  
  constructor(private despesaService: DespesasService, private categoriaDespesaService: CategoriaDespesaService) {}
  
  cor: string = "#F40808";
  despesas: DespesaInterface[] = [];
  totalPorCategoriaDespesa: TotalPorCategoriaInterface[] = [];

  ngOnInit(): void {
    this.getDespesas(1);
    this.getTotalCategoriaDespesas(1);
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
}
