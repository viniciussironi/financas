import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CurrencyMaskModule } from 'ng2-currency-mask';

import { CategoriaInterface } from '../../../interface/categoria-interface';

@Component({
  selector: 'app-add-despesa-form',
  standalone: true,
  imports: 
  [
    CommonModule, 
    ReactiveFormsModule,
    CurrencyMaskModule,
  ],
  templateUrl: './add-despesa-form.component.html',
  styleUrl: './add-despesa-form.component.scss'
})
export class AddDespesaFormComponent implements OnInit{
  
  @Input() 
  tituloPagina: string = '';
  @Input() 
  textButton: string = '';
  @Input()
  listaCategoria: CategoriaInterface[] = [];
  
  @Input()
  formData = new FormControl('', Validators.required);
  @Input()
  formValor = new FormControl('', Validators.required);
  @Input()
  formCategoryId = new FormControl('', Validators.required);
  @Input()
  formEParcelada = new FormControl();
  @Input()
  formQtnParcelas = new FormControl('', Validators.required);
  @Input()
  formNomeCategoriaDespesa = new FormControl('', Validators.required);

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

  ngOnInit() {
  }

  inserirMovimentacao() {
    this.inserirOutput.emit();
  }

  inserirCategoria() {
    this.inserirCategoriaOutput.emit();
  }

  mostrar() {
    this.formEParcelada.value == true;
    this.formEParcelada.setValue(true);
  }

  naoMostrar() {
    this.formEParcelada.value == false;
    this.formEParcelada.setValue(false);
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