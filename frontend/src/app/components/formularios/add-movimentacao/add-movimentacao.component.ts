import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CurrencyMaskModule } from 'ng2-currency-mask';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

import { CategoriaInterface } from '../../../interface/categoria-interface';

@Component({
  selector: 'app-add-movimentacao',
  standalone: true,
  imports: [
    CommonModule, 
    ReactiveFormsModule,
    CurrencyMaskModule,
  ],
  templateUrl: './add-movimentacao.component.html',
  styleUrl: './add-movimentacao.component.scss',
})
export class AddMovimentacaoComponent {

  @Input() 
  titulo: string = '';
  @Input() 
  textButton: string = '';
  @Input()
  localizacaoImagem: string = '';
  @Input()
  listaCategorias: CategoriaInterface[] = [];

  @Input()
  formData = new FormControl();
  @Input()
  formValor = new FormControl();
  @Input()
  formCategoryId = new FormControl();

  @Output()
  inserirOutput: EventEmitter<any> = new EventEmitter();
  
  inserirImp() {
    this.inserirOutput.emit()
  }
}
