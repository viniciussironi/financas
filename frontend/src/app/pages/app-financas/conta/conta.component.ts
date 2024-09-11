import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { tap } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

import { FormContaComponent } from '../../../components/formularios/form-conta/form-conta.component';
import { HeaderDashbordComponent } from '../../../components/comp-gerais/header-app/header.component';
import { UsuarioService } from '../../../services/usuario.service';
import { UsuarioInterface } from '../../../interface/usuario-interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-conta',
  standalone: true,
  imports: [FormContaComponent, HeaderDashbordComponent],
  templateUrl: './conta.component.html',
  styleUrl: './conta.component.scss'
})
export class ContaComponent implements OnInit {

  usuario!: UsuarioInterface;

  formNome = new FormControl('', [Validators.required]);
  formSobrenome = new FormControl('', [Validators.required]);
  formEmail = new FormControl('', [Validators.required, Validators.email]);
  formGroup = new FormGroup({
    formSenha: new FormControl('', [Validators.required, Validators.minLength(6)]),
    formNovaSenha: new FormControl('', [Validators.required, Validators.minLength(6)])
  }, { validators: senhasIguaisValidator() });

  constructor(private usuarioService: UsuarioService, private router: Router) {}
  
  ngOnInit() {
    this.getUsuarioLogado().subscribe(() => {
      this.formNome.setValue(this.usuario.nome);
      this.formSobrenome.setValue(String(this.usuario.sobrenome));
      this.formEmail.setValue(this.usuario.email);
    });
  }

  getUsuarioLogado() {
    return this.usuarioService.getUsuarioLogado().pipe(
      tap((usuario: UsuarioInterface) => {
        this.usuario = usuario
      })
    )
  }

  atualizarUsuario() {
    const usuario = {
      nome: this.formNome.value,
      sobrenome: this.formSobrenome.value,
      email: this.formEmail.value,
      senha: this.formGroup.get('formSenha')?.value
    };
    this.usuarioService.atualizarUsuario(usuario).subscribe({
      next: () => {
        this.router.navigate(['/app-finances/visao-geral']);
      }
    });
  }

  estaValidoFormularioConta(): boolean {
    if(this.formNome.invalid || this.formSobrenome.invalid || this.formEmail.invalid || this.formGroup.invalid) {
      return false
    }
    else {
      return true;
    }
  }
}

export function senhasIguaisValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const senha = control.get('formSenha')?.value;
    const novaSenha = control.get('formNovaSenha')?.value;
    return senha && novaSenha && senha !== novaSenha ? { senhasDiferentes: true } : null;
  };
}
