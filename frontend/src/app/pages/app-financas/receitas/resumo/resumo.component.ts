import { Component, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { TotalPorCategoriaInterface } from '../../../../interface/total_por_categoria-interface';
import { Page } from '../../../../interface/page-interface';
import { ReceitaInterface } from '../../../../interface/receitas-interface';
import { TotalPorMesInterface } from '../../../../interface/total_por_mes-interface';
import { CategoriaInterface } from '../../../../interface/categoria-interface';

import { ReceitasService } from '../../../../services/receitas.service';
import { CategoriaReceitaService } from '../../../../services/categoria-receita.service';

import { MovimentacaoPrincipalComponent } from "../../../../components/movimentacao/movimentacao-principal/movimentacao-principal.component";

@Component({
  selector: 'app-resumo',
  standalone: true,
  imports: [MovimentacaoPrincipalComponent, ReactiveFormsModule, CommonModule],
  templateUrl: './resumo.component.html',
  styleUrl: './resumo.component.scss'
})
export class ResumoReceitasComponent implements OnInit {
  
  constructor(private receitaService: ReceitasService, private categoriaReceitaService: CategoriaReceitaService) {}
  
  cor: string = "#06894A";
  totalReceitas: number = 0;
  receitas: Page<ReceitaInterface> = { content: [], totalPages: 0, number: 0 };
  categorias: CategoriaInterface[] = [];
  totalPorMes: TotalPorMesInterface[] = [];
  totalPorCategoriaReceita: TotalPorCategoriaInterface[] = [];


  formCategoryId = new FormControl('');
  formInicio = new FormControl('');
  formFim = new FormControl('');
  
  ngOnInit(): void {
    this.getReceitas(1, '', '', '');
    this.getCategorias(); 
    this.getTotalCategoriaReceitas(1);
    this.getTotalReceitas();
    this.getTotalPorMes(1);
  }
  
  getReceitas(userId: number, categoriaId: string, inicio: string, fim: string) {
    this.receitaService.getReceitas(userId, categoriaId, inicio, fim).subscribe(
    (receitas: Page<ReceitaInterface>) => {
      this.receitas = receitas;
    })
  }

  getCategorias() {
    this.categoriaReceitaService.getCategoriasReceitas().subscribe(
    (categorias: CategoriaInterface[]) => {
      this.categorias = categorias;
    })
  }

  getTotalCategoriaReceitas(userId: number) {
    this.categoriaReceitaService.getTotalPorCategoriaReceita(userId).subscribe(
    (totalPorCategoriaReceita: TotalPorCategoriaInterface[]) => {
    this.totalPorCategoriaReceita = totalPorCategoriaReceita;
    });
  }

  getTotalPorMes(userId: number) {
    this.receitaService.getTotalPorMes(userId).subscribe(
    (totalPorMes: TotalPorMesInterface[]) => {
    this.totalPorMes = totalPorMes;
    });
  }

  getTotalReceitas() {
    this.receitas.content.forEach(x => {
      this.totalReceitas += x.valor
    });
  }

  onSubmit(event: Event) {
    event.preventDefault();
    console.log(this.formCategoryId)
    this.getReceitas(1, String(this.formCategoryId.value), String(this.formInicio.value), String(this.formFim.value));
  }

  resetFilters() {
    this.formCategoryId.setValue('');
    this.formInicio.setValue('');
    this.formFim.setValue('');
    this.getReceitas(1, '', '', '');
  }
}
