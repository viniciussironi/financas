import { Component, OnInit } from '@angular/core';
import { MovimentacaoPrincipalComponent } from "../../../../components/movimentacao/movimentacao-principal/movimentacao-principal.component";
import { DespesasService } from '../../../../services/despesas.service';
import { CategoriaDespesaService } from '../../../../services/categoria-despesa.service';
import { DespesaInterface } from '../../../../interface/despesas-interface';
import { TotalPorMesInterface } from '../../../../interface/total_por_mes-interface';
import { TotalPorCategoriaInterface } from '../../../../interface/total_por_categoria-interface';

@Component({
  selector: 'app-resumo',
  standalone: true,
  imports: [MovimentacaoPrincipalComponent],
  templateUrl: './resumo.component.html',
  styleUrl: './resumo.component.scss'
})
export class ResumoDespesasComponent implements OnInit {
  
  constructor(private despesaService: DespesasService, private categoriadespesaService: CategoriaDespesaService) {}
  
  cor: string = "#F40808";
  totalDespesas: number = 0;
  despesas: DespesaInterface[] = [];
  totalPorMes: TotalPorMesInterface[] = [];
  totalPorCategoriaDespesa: TotalPorCategoriaInterface[] = [];
  
  ngOnInit(): void {
    this.getDespesas(1);
    this.getTotalCategoriaDespesas(1);
    this.getTotalDespesas();
    this.getTotalPorMes(1);
  }
  
  getDespesas(userId: number) {
    this.despesaService.getDespesas(userId).subscribe(
    (despesas: DespesaInterface[]) => {
      this.despesas = despesas;
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
    this.despesas.forEach(x => {
      this.totalDespesas += x.valor
    });
  }
}

