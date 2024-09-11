import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { senhasIguaisValidator } from '../../../pages/app-financas/conta/conta.component';

@Component({
  selector: 'app-form-conta',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './form-conta.component.html',
  styleUrl: './form-conta.component.scss'
})
export class FormContaComponent {

  @Input()
  formNome = new FormControl('', [Validators.required, Validators.nullValidator]);
  @Input()
  formSobrenome = new FormControl('', [Validators.required, Validators.nullValidator]);
  @Input()
  formEmail = new FormControl('', [Validators.required, Validators.nullValidator, Validators.email]);
  @Input()
  formGroup = new FormGroup({
    formSenha: new FormControl('', [Validators.required, Validators.minLength(6)]),
    formNovaSenha: new FormControl('', [Validators.required, Validators.minLength(6)])
  }, { validators: senhasIguaisValidator() });
  @Input()
  estaValidoFormularioConta: boolean = false;

  @Output()
  atualizarOutput: EventEmitter<any> = new EventEmitter();

  atualizar() {
    this.atualizarOutput.emit();
  }
}






