import { Component, OnInit } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
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

  formData = new FormControl('', Validators.required);
  formValor = new FormControl('', Validators.required);
  formCategoryId = new FormControl();
  formQtnParcelas = new FormControl();
  formEParcelada = new FormControl();
  formNomeCategoriaDespesa = new FormControl('', Validators.required);

  constructor(
    private categoriaDespesaService: CategoriaDespesaService, 
    private despesaService: DespesasService,
    private route: ActivatedRoute,
    private router: Router,
  ) {}
  
  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id') || '';
    this.getCategorias();
    this.getDespesaById().subscribe(() => {
      this.formEParcelada.setValue(this.despesa.e_parcelada);
      this.formValor.setValue(String(this.despesa.valor));
      this.formQtnParcelas.setValue(this.despesa.quantidadeDeParcelas);
      this.formData.setValue(this.despesa.data);
      this.formCategoryId.setValue(this.despesa.categoriaDespesa.id)
    });
  }

  getCategorias() {
    this.categoriaDespesaService.getCategoriasDespesas().subscribe(
    (listaCategoria: CategoriaInterface[]) => {
      this.listaCategoria = listaCategoria;
    });
  }

  getDespesaById() {
    return this.despesaService.getDespesaById(Number(this.id)).pipe(
      tap((despesa: DespesaAtualizarInterface) => {
        this.despesa = despesa;
      })
    );
  }

  insertCategoriaDespesa() {
    const categoria = {
      nome: this.formNomeCategoriaDespesa.value
    }
    this.categoriaDespesaService.insertCategoriaDespesa(categoria).subscribe(() => {
      this.getCategorias();
    });
  }
  updateDespesa() {
    const despesa = {
      e_parcelada: this.formEParcelada.value,
      valor: this.formValor.value,
      data: this.formData.value,
      quantidadeDeParcelas: this.formQtnParcelas.value,
      categoriaDespesa: { id: this.formCategoryId.value }
    };
    this.despesaService.updateDespesa(despesa, Number(this.id)).subscribe({
      next: () => {
        this.router.navigate(['/app-finances/despesas/resumo']);
      }
    });
  }

  estaValidoFormularioDespesa(): boolean {
    if(this.formValor.invalid && this.formData.invalid || this.formCategoryId.invalid) {
      if(this.formEParcelada.value == true && this.formQtnParcelas.invalid) {
        return false
      }
      return false
    }
    else {
      return true;
    }
  }

  estaValidoFormularioCategoria(): boolean {
    if(this.formNomeCategoriaDespesa.invalid) {
      return false
    }
    else {
      return true;
    }
  }
}
