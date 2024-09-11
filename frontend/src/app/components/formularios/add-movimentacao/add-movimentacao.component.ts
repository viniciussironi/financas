import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CurrencyMaskModule } from 'ng2-currency-mask';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';

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
  listaCategoria: CategoriaInterface[] = [];

  @Input()
  formData = new FormControl('', Validators.required);
  @Input()
  formValor = new FormControl('', Validators.required);
  @Input()
  formCategoryId = new FormControl('', Validators.required);
  @Input()
  formNomeCategoriaReceita = new FormControl('', Validators.required);
  @Input()
  estaValidoFormularioReceita: boolean = false;
  @Input()
  estaValidoFormularioCategoria: boolean = false;

  @Output()
  inserirOutput: EventEmitter<any> = new EventEmitter();
  @Output()
  inserirCategoriaOutput: EventEmitter<any> = new EventEmitter();
  
  status: boolean = false;
  icon: string = 'add';

  icons = {
    add: 'add',
    keyboard_arrow_up: 'keyboard_arrow_up'
  }

  inserirMovimentacao() {
    this.inserirOutput.emit();
  }

  inserirCategoria() {
    this.inserirCategoriaOutput.emit();
  }

  addCategoriaBtn() {
    if(this.status == true) {
      this.status = false
      this.icon = this.icons.add;
    }
    else {
      this.status = true
      this.icon = this.icons.keyboard_arrow_up;
    }
  }
}

