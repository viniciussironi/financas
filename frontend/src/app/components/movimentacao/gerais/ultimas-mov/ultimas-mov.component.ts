import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MovimentacaoInterface } from '../../../../interface/movimentacao-interface';
import { Page } from '../../../../interface/page-interface';

@Component({
  selector: 'app-ultimas-mov',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ultimas-mov.component.html',
  styleUrl: './ultimas-mov.component.scss'
})
export class UltimasMovComponent {

  @Input()
  titulo:string = "";
  @Input()
  listaMovimentacao: Page<MovimentacaoInterface> = { content: [], totalPages: 0, number: 0 };
  @Input()
  cor: string = "";
  @Input()
  getMovimentacao: () => void

  selectedPage: number = 0;

  constructor() {
    this.getMovimentacao = () => {
    };
  }

  nextPage() {
    if (this.listaMovimentacao.number < this.listaMovimentacao.totalPages - 1) {
      this.listaMovimentacao.number++;
      this.selectedPage = this.listaMovimentacao.number;
      this.getMovimentacao();
    }
  }

  backPage() {
    if (this.listaMovimentacao.number > 0) {
      this.listaMovimentacao.number --;
      this.selectedPage = this.listaMovimentacao.number;
      this.getMovimentacao();
    }
  }
}
