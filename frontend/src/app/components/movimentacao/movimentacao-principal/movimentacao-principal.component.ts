import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

import { TotalPorMesInterface } from '../../../interface/total_por_mes-interface';
import { MovimentacaoInterface } from '../../../interface/movimentacao-interface';
import { TotalPorCategoriaInterface } from '../../../interface/total_por_categoria-interface';
import { TotalReceitaDespesaComponent } from "../gerais/total-receita-despesa/total-receita-despesa.component";
import { UltimasMovComponent } from "../gerais/ultimas-mov/ultimas-mov.component";
import { BtnAddMovimentacaoComponent } from "../gerais/btn-add-movimentacao/btn-add-movimentacao.component";
import { TotalPorCategoriaComponent } from "../gerais/por-categoria/total-por-categoria.component";
import { TotalUltimosMesesComponent } from "../gerais/ultimos-meses/total-ultimos-meses.component";
import { CategoriaInterface } from '../../../interface/categoria-interface';
import { Page } from '../../../interface/page-interface';

@Component({
  selector: 'app-movimentacao-principal',
  standalone: true,
  imports: [
    RouterModule,
    ReactiveFormsModule,
    TotalReceitaDespesaComponent,
    UltimasMovComponent,
    BtnAddMovimentacaoComponent,
    TotalPorCategoriaComponent,
    TotalUltimosMesesComponent,
],
  templateUrl: './movimentacao-principal.component.html',
  styleUrl: './movimentacao-principal.component.scss'
})
export class MovimentacaoPrincipalComponent {

  @Input()
  cor: string = "";
  @Input()
  link: string = "";
  @Input()
  totalDespesas: number = 0;
  @Input()
  totalPorMes: TotalPorMesInterface[] = [];
  @Input()
  movimentacao: Page<MovimentacaoInterface> = { content: [], totalPages: 0, number: 0 };
  @Input()
  totalPorCategoriaDespesa: TotalPorCategoriaInterface[] = [];
} 
