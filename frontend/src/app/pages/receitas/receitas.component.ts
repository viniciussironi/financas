import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReceitasService } from '../../services/receitas.service';
import { CategoriaReceitaService } from '../../services/categoria-receita.service';

import { ReceitaInterface } from '../../interface/receitas-interface';
import { TotalPorCategoriaInterface } from '../../interface/total_por_categoria-interface';

import { UltimasMovComponent } from '../../components/movimentacao/ultimas-mov/ultimas-mov.component';
import { TotalReceitaDespesaComponent } from '../../components/movimentacao/total-receita-despesa/total-receita-despesa.component';
import { BtnAddMovimentacaoComponent } from '../../components/movimentacao/btn-add-movimentacao/btn-add-movimentacao.component';
import { HeaderDashbordComponent } from '../../components/comp-gerais/header-dashboard/header-app/header.component';
import { NavLateralComponent } from '../../components/comp-gerais/nav-bar-lateral-dashboard/nav-lateral-app/nav-lateral.component';
import { TotalPorCategoriaComponent } from '../../components/movimentacao/por-categoria/total-por-categoria.component';
import { TotalUltimosMesesComponent } from '../../components/movimentacao/ultimos-meses/total-ultimos-meses.component';


@Component({
  selector: 'app-receitas',
  standalone: true,
  imports: [
    CommonModule,
    HeaderDashbordComponent,
    UltimasMovComponent,
    TotalReceitaDespesaComponent,
    BtnAddMovimentacaoComponent,
    NavLateralComponent,
    TotalPorCategoriaComponent,
    TotalUltimosMesesComponent
],
  templateUrl: './receitas.component.html',
  styleUrl: './receitas.component.scss'
})
export class ReceitasComponent implements OnInit {
  
  constructor(private receitaService: ReceitasService, private categoriaReceitaService: CategoriaReceitaService) {}
  
  cor: string = "#06894A";
  receitas: ReceitaInterface[] = [];
  totalPorCategoriaReceita: TotalPorCategoriaInterface[] = [];
  
  ngOnInit(): void {
    this.getReceitas(1);
    this.getTotalCategoriaReceitas(1);
  }
  
  getReceitas(userId: number) {
    this.receitaService.getReceitas(userId).subscribe(
    (receitas: ReceitaInterface[]) => {
      this.receitas = receitas;
    })
  }

  getTotalCategoriaReceitas(userId: number) {
    this.categoriaReceitaService.getTotalPorCategoriaReceita(userId).subscribe(
    (totalPorCategoriaReceita: TotalPorCategoriaInterface[]) => {
    this.totalPorCategoriaReceita = totalPorCategoriaReceita;
    });
  }

}
