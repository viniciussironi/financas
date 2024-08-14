import { Component, Input, Output, EventEmitter } from '@angular/core';
import { MovimentacaoInterface } from '../../../interface/movimentacao-interface';
import { Page } from '../../../interface/page-interface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-ultimas-movimentacoes',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ultimas-movimentacoes.component.html',
  styleUrl: './ultimas-movimentacoes.component.scss'
})
export class UltimasMovimentacoesComponent {

  @Input()
  lista!: Page<MovimentacaoInterface>;
  
  @Output()
  nextPageOutput: EventEmitter<any> = new EventEmitter();
  @Output()
  backPageOutput: EventEmitter<any> = new EventEmitter();


  nextPageImp() {
    this.nextPageOutput.emit()
  }
  backPageImp() {
    this.backPageOutput.emit()
  }
}
