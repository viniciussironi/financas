import { Component, OnInit } from '@angular/core';
import { NavLateralComponent } from '../../components/dashboard/nav/nav-lateral/nav-lateral.component';
import { HeaderDashbordComponent } from '../../components/dashboard/header/header/header.component';
import { ResumoDashboardComponent } from '../../components/dashboard/resumo/resumo/resumo.component';
import { ReceitasService } from '../../services/receitas.service';
import { DespesasService } from '../../services/despesas.service';
import { ReceitaInterface } from '../../interface/receitas-interface';
import { DespesaInterface } from '../../interface/despesas-interface';


@Component({
  selector: 'app-resumo',
  standalone: true,
  imports: [NavLateralComponent, HeaderDashbordComponent, ResumoDashboardComponent],
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
