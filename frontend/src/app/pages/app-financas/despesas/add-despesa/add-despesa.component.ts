import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Observable, tap } from 'rxjs';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

import { CategoriaInterface } from '../../../../interface/categoria-interface';
import { DespesaInterface } from '../../../../interface/despesas-interface';

import { CategoriaDespesaService } from '../../../../services/categoria-despesa.service';
import { DespesasService } from '../../../../services/despesas.service';

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
  despesa!: DespesaInterface;
  id: string = '';

  formData = new FormControl();
  formValor = new FormControl();
  formCategoryId = new FormControl();
  
  constructor(
    private categoriaDespesaService: CategoriaDespesaService, 
    private despesaService: DespesasService,
    private route: ActivatedRoute,
    private renderer: Renderer2,
    private elementRef: ElementRef,
  ) {}
  
  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id') || '';
    this.getCategorias();
    

  }

  getCategorias() {
    this.categoriaDespesaService.getCategoriasDespesas().subscribe(
    (listaCategoria: CategoriaInterface[]) => {
      this.listaCategoria = listaCategoria;
    });
  }

  getDespesaById(): Observable<DespesaInterface> {
    return this.despesaService.getDespesaById(Number(this.id)).pipe(
      tap((despesa: DespesaInterface) => {
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
}
