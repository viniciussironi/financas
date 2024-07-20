import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MovimentacaoInterface } from '../../../interface/movimentacao-interface';

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
  listaMovimentacao: MovimentacaoInterface[] = [];
  @Input()
  cor: string = "";
}
