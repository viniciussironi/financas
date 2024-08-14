import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-btn-add-movimentacao',
  standalone: true,
  imports: [],
  templateUrl: './btn-add-movimentacao.component.html',
  styleUrl: './btn-add-movimentacao.component.scss'
})
export class BtnAddMovimentacaoComponent {

  @Input()
  nomeBtn:string = "";
}
