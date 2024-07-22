import { Component, OnInit } from '@angular/core';

import { TotalPorCategoriaInterface } from '../../../../interface/total_por_categoria-interface';
import { ReceitaInterface } from '../../../../interface/receitas-interface';
import { TotalPorMesInterface } from '../../../../interface/total_por_mes-interface';

import { ReceitasService } from '../../../../services/receitas.service';
import { CategoriaReceitaService } from '../../../../services/categoria-receita.service';

import { MovimentacaoPrincipalComponent } from "../../../../components/movimentacao/movimentacao-principal/movimentacao-principal.component";

@Component({
  selector: 'app-resumo',
  standalone: true,
  imports: [MovimentacaoPrincipalComponent],
  templateUrl: './resumo.component.html',
  styleUrl: './resumo.component.scss'
})
export class ResumoReceitasComponent implements OnInit {
  
  constructor(private receitaService: ReceitasService, private categoriaReceitaService: CategoriaReceitaService) {}
  
  cor: string = "#06894A";
  totalReceitas: number = 0;
  receitas: ReceitaInterface[] = [];
  totalPorMes: TotalPorMesInterface[] = [];
  totalPorCategoriaReceita: TotalPorCategoriaInterface[] = [];
  
  ngOnInit(): void {
    this.getReceitas(1);
    this.getTotalCategoriaReceitas(1);
    this.getTotalReceitas();
    this.getTotalPorMes(1);
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

  getTotalPorMes(userId: number) {
    this.receitaService.getTotalPorMes(userId).subscribe(
    (totalPorMes: TotalPorMesInterface[]) => {
    this.totalPorMes = totalPorMes;
    });
  }

  getTotalReceitas() {
    this.receitas.forEach(x => {
      this.totalReceitas += x.valor
    });
  }
}
