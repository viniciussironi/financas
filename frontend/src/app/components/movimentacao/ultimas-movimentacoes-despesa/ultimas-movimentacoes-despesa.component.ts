import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Page } from '../../../interface/page-interface';
import { DespesaInterface } from '../../../interface/despesas-interface';
import { CommonModule, DecimalPipe } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-ultimas-movimentacoes-despesa',
  standalone: true,
  imports: [CommonModule, RouterModule, DecimalPipe],
  templateUrl: './ultimas-movimentacoes-despesa.component.html',
  styleUrl: './ultimas-movimentacoes-despesa.component.scss'
})
export class UltimasMovimentacoesDespesaComponent {
  
  @Input()
  lista: Page<DespesaInterface> = { content: [], totalPages: 0, number: 0 };
  @Input()
  cor: string = '';
  
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

