import { Component, OnInit } from '@angular/core';

import { ReceitasService } from '../../services/receitas.service';
import { DespesasService } from '../../services/despesas.service';

import { ReceitaInterface } from '../../interface/receitas-interface';
import { DespesaInterface } from '../../interface/despesas-interface';

import { ResumoDashboardComponent } from '../../components/pagina-resumo/resumo/resumo.component';
import { NavLateralComponent } from '../../components/comp-gerais/nav-bar-lateral-dashboard/nav-lateral-app/nav-lateral.component';
import { HeaderDashbordComponent } from '../../components/comp-gerais/header-dashboard/header-app/header.component';
import { GraficoUltimosMesesComponent } from "../../components/pagina-resumo/grafico-ultimos-meses/grafico-ultimos-meses.component";
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-resumo',
  standalone: true,
  imports: [
    CommonModule, 
    NavLateralComponent,
    HeaderDashbordComponent,
    ResumoDashboardComponent,
    GraficoUltimosMesesComponent
],
  templateUrl: './resumo.component.html',
  styleUrl: './resumo.component.scss'
})
export class ResumoComponent implements OnInit{
  
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
