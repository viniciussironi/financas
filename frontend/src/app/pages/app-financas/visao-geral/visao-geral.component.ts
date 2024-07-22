import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { ReceitasService } from '../../../services/receitas.service';
import { DespesasService } from '../../../services/despesas.service';

import { ReceitaInterface } from '../../../interface/receitas-interface';
import { DespesaInterface } from '../../../interface/despesas-interface';

import { NavLateralComponent } from "../../../components/comp-gerais/nav-bar-lateral-dashboard/nav-lateral-app/nav-lateral.component";
import { ResumoDashboardComponent } from "../../../components/pagina-resumo/resumo/resumo.component";
import { HeaderDashbordComponent } from '../../../components/comp-gerais/header-dashboard/header-app/header.component';

@Component({
  selector: 'app-visao-geral',
  standalone: true,
  imports: [RouterOutlet, NavLateralComponent, HeaderDashbordComponent, ResumoDashboardComponent],
  templateUrl: './visao-geral.component.html',
  styleUrl: './visao-geral.component.scss'
})
export class VisaoGeralComponent implements OnInit {
  
  constructor(private receitaService: ReceitasService, private despesaService: DespesasService) {}
  
  receitas: ReceitaInterface[] = [];
  despesas: DespesaInterface[] = [];
  
  totalReceitas: number = 0;
  totalDespesas: number = 0;

  ngOnInit(): void {
    this.getReceitas(1);
    this.getTotalReceitas();
    this.getDespesas(1);
    this.getTotalDespesas();
  }
  
  getReceitas(userId: number) {
    this.receitaService.getReceitas(userId).subscribe(
    (receitas: ReceitaInterface[]) => {
    this.receitas = receitas;
    });
  }

  getDespesas(userId: number) {
    this.despesaService.getDespesas(userId).subscribe(
    (despesas: DespesaInterface[]) => {
    this.despesas = despesas;
    });
  }

  getTotalReceitas() {
    this.receitas.forEach(x => {
      this.totalReceitas += x.valor
    })
  }

  getTotalDespesas() {
    this.despesas.forEach(x => {
      this.totalDespesas += x.valor
    })
  }
}
