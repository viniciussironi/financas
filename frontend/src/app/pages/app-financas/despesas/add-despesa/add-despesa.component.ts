import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Observable, tap } from 'rxjs';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

import { CategoriaInterface } from '../../../../interface/categoria-interface';
import { DespesaAtualizarInterface } from '../../../../interface/despesa_atualizar-interface';

import { CategoriaDespesaService } from '../../../../services/categoria-despesa.service';
import { DespesasService } from '../../../../services/despesas.service';
import { CurrencyMaskModule } from 'ng2-currency-mask';
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
  textButton = 'Adicionar'

  formData = new FormControl();
  formValor = new FormControl();
  formCategoryId = new FormControl();
  formQtnParcelas = new FormControl();
  formPrimeiraParcela = new FormControl();
  formEParcelada = new FormControl();

  constructor(
    private categoriaDespesaService: CategoriaDespesaService, 
    private despesaService: DespesasService,
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

  insertDespesa() {
    const despesa = {
      data: this.formData.value,
      valor: this.formValor.value,
      e_parcelado: this.formEParcelada.value,
      qtdParcelas: this.formQtnParcelas.value,
      primeiraParcela: this.formPrimeiraParcela.value,
      categoria: { id: this.formCategoryId.value }
    };
    console.log(despesa)
    this.despesaService.insertDespesa(despesa).subscribe();
  }
}
