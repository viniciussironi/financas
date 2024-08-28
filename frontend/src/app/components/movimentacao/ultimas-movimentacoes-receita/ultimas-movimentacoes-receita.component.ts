import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule, DecimalPipe } from '@angular/common';
import { RouterModule } from '@angular/router';

import { ReceitaInterface } from '../../../interface/receitas-interface';
import { Page } from '../../../interface/page-interface';

@Component({
  selector: 'app-ultimas-movimentacoes-receita',
  standalone: true,
  imports: [CommonModule, RouterModule, DecimalPipe],
  templateUrl: './ultimas-movimentacoes-receita.component.html',
  styleUrl: './ultimas-movimentacoes-receita.component.scss'
})
export class UltimasMovimentacoesReceitaComponent {

  @Input()
  lista!: Page<ReceitaInterface>;
  @Input()
  cor: string = '';
  @Input()
  linkEdit: string = '';
  
  @Output()
  nextPageOutput: EventEmitter<any> = new EventEmitter();
  @Output()
  backPageOutput: EventEmitter<any> = new EventEmitter();
  @Output()
  deleteEvent: EventEmitter<any> = new EventEmitter();

  nextPageImp() {
    this.nextPageOutput.emit()
  }
  backPageImp() {
    this.backPageOutput.emit()
  }
  delete(id: number) {
    this.deleteEvent.emit(id)
  }
}
