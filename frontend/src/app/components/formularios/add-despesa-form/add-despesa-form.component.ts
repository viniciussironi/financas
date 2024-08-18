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
  formData = new FormControl(Validators.required, Validators.nullValidator);
  @Input()
  formValor = new FormControl(Validators.required, Validators.nullValidator);
  @Input()
  formCategoryId = new FormControl(Validators.required, Validators.nullValidator);
  @Input()
  formEParcelada = new FormControl();
  @Input()
  formQtnParcelas = new FormControl();
  @Input()
  formPrimeiraParcela = new FormControl();
  
  @Output()
  inserirOutput: EventEmitter<any> = new EventEmitter();
  
  ngOnInit() {
    this.formEParcelada.setValue(false);
  }

  inserirImp() {
    this.inserirOutput.emit()
  }

  mostrar() {
    this.formEParcelada.value == true;
    this.formEParcelada.setValue(true);
  }

  naoMostrar() {
    this.formEParcelada.value == false;
    this.formEParcelada.setValue(false);
  }
}
