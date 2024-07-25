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
  @Input()
  cor: string = "";
}
