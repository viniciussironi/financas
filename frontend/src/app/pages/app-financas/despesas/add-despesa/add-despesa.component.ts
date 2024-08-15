import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Observable, tap } from 'rxjs';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

import { CategoriaInterface } from '../../../../interface/categoria-interface';
import { DespesaInterface } from '../../../../interface/despesas-interface';

import { CategoriaDespesaService } from '../../../../services/categoria-despesa.service';
import { DespesasService } from '../../../../services/despesas.service';
import { DespesaAtualizarInterface } from '../../../../interface/despesa_atualizar-interface';

@Component({
  selector: 'app-add-despesa',
  standalone: true,
  imports: [
    CommonModule, 
    ReactiveFormsModule,
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

  constructor(
    private categoriaDespesaService: CategoriaDespesaService, 
    private despesaService: DespesasService,
    private route: ActivatedRoute,
  ) {}
  
  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id') || '';
    this.getCategorias();
    this.getDespesaById().subscribe(() => {
      if (this.despesa) {
        this.tituloPagina = 'Editar despesa';
        this.textButton = 'Editar';
        this.formData.setValue(this.despesa.data);
        this.formValor.setValue(String(this.despesa.valor));
        this.formCategoryId.setValue(this.despesa.categoria.id);
        this.status = this.despesa.e_parcelado;
        this.formQtnParcelas.setValue(this.despesa.qtdParcelas);
        this.formPrimeiraParcela.setValue(this.despesa.primeiraParcela);
      }
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

  insertDespesa() {
    const despesa = {
      data: this.formData.value,
      valor: this.formValor.value,
      categoria: { id: this.formCategoryId.value }
    };

    this.despesaService.insertDespesa(despesa).subscribe();
  }

  mostrar() {
    this.status = true;
  }

  naoMostrar() {
    this.status = false;
  }
}
