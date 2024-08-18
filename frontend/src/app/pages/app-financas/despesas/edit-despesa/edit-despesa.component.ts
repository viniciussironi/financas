import { Component, OnInit } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { CurrencyMaskModule } from 'ng2-currency-mask';
import { CommonModule } from '@angular/common';

import { AddMovimentacaoComponent } from "../../../../components/formularios/add-movimentacao/add-movimentacao.component";

import { CategoriaInterface } from '../../../../interface/categoria-interface';
import { DespesaAtualizarInterface } from '../../../../interface/despesa_atualizar-interface';

import { CategoriaDespesaService } from '../../../../services/categoria-despesa.service';
import { DespesasService } from '../../../../services/despesas.service';
import { AddDespesaFormComponent } from "../../../../components/formularios/add-despesa-form/add-despesa-form.component";

@Component({
  selector: 'app-edit-despesa',
  standalone: true,
  imports: [
    AddMovimentacaoComponent,
    ReactiveFormsModule,
    CurrencyMaskModule,
    CommonModule,
    AddDespesaFormComponent
],
  templateUrl: './edit-despesa.component.html',
  styleUrl: './edit-despesa.component.scss'
})
export class EditDespesaComponent implements OnInit {

  listaCategoria: CategoriaInterface[] = [];
  despesa!: DespesaAtualizarInterface;
  id: string = '';
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
    private route: ActivatedRoute,
  ) {}
  
  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id') || '';
    this.getCategorias();
    this.getDespesaById().subscribe(() => {
      this.formData.setValue(this.despesa.data);
      this.formValor.setValue(String(this.despesa.valor));
      this.formCategoryId.setValue(this.despesa.categoria.id);
      this.formEParcelada.setValue(this.despesa.e_parcelado);
      this.formQtnParcelas.setValue(this.despesa.qtdParcelas);
      this.formPrimeiraParcela.setValue(this.despesa.primeiraParcela);
    });
  }

  getCategorias() {
    this.categoriaDespesaService.getCategoriasDespesas().subscribe(
    (listaCategoria: CategoriaInterface[]) => {
      this.listaCategoria = listaCategoria;
    });
  }

  getDespesaById(): Observable<DespesaAtualizarInterface> {
    return this.despesaService.getDespesaById(Number(this.id)).pipe(
      tap((despesa: DespesaAtualizarInterface) => {
        this.despesa = despesa;
      })
    );
  }

  updateDespesa() {
    const despesa = {
      data: this.formData.value,
      valor: this.formValor.value,
      e_parcelado: this.formEParcelada.value,
      qtdParcelas: this.formQtnParcelas.value,
      primeiraParcela: this.formPrimeiraParcela.value,
      categoria: { id: this.formCategoryId.value }
    };
    console.log(despesa)

    this.despesaService.updateDespesa(despesa, Number(this.id)).subscribe();
  }
}
