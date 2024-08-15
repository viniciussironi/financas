import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MovimentacaoInterface } from '../../../interface/movimentacao-interface';
import { Page } from '../../../interface/page-interface';
import { RouterModule } from '@angular/router';
import { number } from 'echarts';

@Component({
  selector: 'app-ultimas-movimentacoes',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './ultimas-movimentacoes.component.html',
  styleUrl: './ultimas-movimentacoes.component.scss'
})
export class UltimasMovimentacoesComponent {

  @Input()
  lista!: Page<MovimentacaoInterface>;
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
