import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { ReceitasService } from '../../../services/receitas.service';
import { DespesasService } from '../../../services/despesas.service';

import { NavLateralComponent } from "../../../components/comp-gerais/nav-bar-lateral-dashboard/nav-lateral-app/nav-lateral.component";
import { ResumoDashboardComponent } from "../../../components/pagina-resumo/resumo/resumo.component";
import { HeaderDashbordComponent } from '../../../components/comp-gerais/header-app/header.component';

@Component({
  selector: 'app-visao-geral',
  standalone: true,
  imports: [
    RouterOutlet, 
    NavLateralComponent, 
    HeaderDashbordComponent, 
    ResumoDashboardComponent,
  ],
  templateUrl: './visao-geral.component.html',
  styleUrl: './visao-geral.component.scss'
})
export class VisaoGeralComponent implements OnInit {
  
  constructor(private receitaService: ReceitasService, private despesaService: DespesasService) {}
  
  totalReceitas: number = 0;
  totalDespesas: number = 0;

  ngOnInit(): void {
    this.getTotalReceitas();
    this.getTotalDespesas();
  }
  
  getTotalReceitas() {
    this.receitaService.getTotalReceitas().subscribe(
      (total: number) => {
        this.totalReceitas = total;
      })
  }

  getTotalDespesas() {
    this.despesaService.getTotalDespesas().subscribe(
    (total: number) => {
    this.totalDespesas = total;
    });
  }
}
