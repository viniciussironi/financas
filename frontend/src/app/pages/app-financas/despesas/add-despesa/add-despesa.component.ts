import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { CurrencyMaskModule } from 'ng2-currency-mask';

import { CategoriaInterface } from '../../../../interface/categoria-interface';
import { DespesaAtualizarInterface } from '../../../../interface/despesa_atualizar-interface';
import { DespesaInterface } from '../../../../interface/despesas-interface';
import { ApiErrorInterface } from '../../../../interface/api-error-interface';

import { CategoriaDespesaService } from '../../../../services/categoria-despesa.service';
import { DespesasService } from '../../../../services/despesas.service';

import { AddDespesaFormComponent } from "../../../../components/formularios/add-despesa-form/add-despesa-form.component";


@Component({
  selector: 'app-add-despesa',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    CurrencyMaskModule,
    AddDespesaFormComponent
],
  templateUrl: './add-despesa.component.html',
  styleUrl: './add-despesa.component.scss'
})
export class AddDespesaComponent implements OnInit {

  listaCategoria: CategoriaInterface[] = [];
  despesa!: DespesaAtualizarInterface;
  id: string = '';
  status: boolean = false
  tituloPagina = 'Adicionar despesa';
  textButton = 'Adicionar';
  
  
  erroData: string = ''
  erroValor: string = ''
  erroCategoryId: string = ''
  erroQtnParcelas: string = ''
  erroPrimeiraParcela: string = ''
  erroEParcelada: string = ''
  erroNomeCategoriaDespesa: string = ''

  formData = new FormControl('', Validators.required);
  formValor = new FormControl('', Validators.required);
  formCategoryId = new FormControl('', Validators.required);
  formQtnParcelas = new FormControl('', Validators.required);
  formPrimeiraParcela = new FormControl('', Validators.required);
  formEParcelada = new FormControl();
  formNomeCategoriaDespesa = new FormControl('', Validators.required);

  constructor(
    private categoriaDespesaService: CategoriaDespesaService, 
    private despesaService: DespesasService,
    private router: Router
  ) {}
  
  ngOnInit() {
    this.getCategorias();
  }

  getCategorias() {
    this.categoriaDespesaService.getCategoriasDespesas().subscribe(
    (listaCategoria: CategoriaInterface[]) => {
      this.listaCategoria = listaCategoria;
    });
  }

  insertCategoriaDespesa() {
    const categoria = {
      nome: this.formNomeCategoriaDespesa.value
    }
    this.categoriaDespesaService.insertCategoriaDespesa(categoria).subscribe(() => {
      this.getCategorias();
    });
  }

  insertDespesa() {
    const despesa = {
      data: this.formData.value,
      valor: this.formValor.value,
      e_parcelado: this.formEParcelada.value,
      qtdParcelas: this.formQtnParcelas.value,
      primeiraParcela: this.formPrimeiraParcela.value,
      categoria: { id: this.formCategoryId.value }
    };

    this.despesaService.insertDespesa(despesa).subscribe(
      (response: DespesaInterface) => {
        if(response) {
          this.router.navigate(['./app-finances/despesas/resumo'])
        }
        
      }, (error: ApiErrorInterface) => {
        error.error.errors.forEach(x => {
          x
        });
        
      });
  }
}


