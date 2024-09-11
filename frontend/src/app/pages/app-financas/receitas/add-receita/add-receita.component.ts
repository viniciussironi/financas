import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterOutlet } from '@angular/router';

import { CategoriaReceitaService } from '../../../../services/categoria-receita.service';
import { ReceitasService } from '../../../../services/receitas.service';

import { CategoriaInterface } from '../../../../interface/categoria-interface';
import { ReceitaInterface } from '../../../../interface/receitas-interface';
import { AddMovimentacaoComponent } from "../../../../components/formularios/add-movimentacao/add-movimentacao.component";

@Component({
  selector: 'app-add-receita',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AddMovimentacaoComponent
],
  templateUrl: './add-receita.component.html',
  styleUrl: './add-receita.component.scss'
})
export class AddReceitaComponent implements OnInit {

  listaCategoria: CategoriaInterface[] = [];
  receita!: ReceitaInterface;
  id: string = '';
  tituloPagina = 'Adicionar receita';
  textButton = 'Adicionar'
  validacaoFormularioReceita: boolean = false;
  validacaoFormularioCategoria: boolean = false;
  
  formData = new FormControl('', Validators.required);
  formValor = new FormControl('', Validators.required);
  formCategoryId = new FormControl('', Validators.required);
  formNomeCategoriaReceita = new FormControl('', Validators.required);
  
  constructor(
    private categoriaReceitaService: CategoriaReceitaService, 
    private receitaService: ReceitasService,
    private router: Router
  ) {}
  
  ngOnInit() {
    this.getCategorias();
  }
  
  getCategorias() {
    this.categoriaReceitaService.getCategoriasReceitas().subscribe(
      (listaCategoria: CategoriaInterface[]) => {
        this.listaCategoria = listaCategoria;
      });
    }
  
  insertCategoriaReceita() {
    const categoria = {
      nome: this.formNomeCategoriaReceita.value
    }
    this.categoriaReceitaService.insertCategoriaReceita(categoria).subscribe(() => {
      this.getCategorias();
    });
  }
    
  insertReceita() {
    const receita = {
      data: this.formData.value,
      valor: this.formValor.value,
      categoriaReceita: { id: this.formCategoryId.value }
    };
    
    if(this.estaValidoFormularioReceita() == true) {
      this.receitaService.insertReceita(receita).subscribe({
        next: () => {
          this.router.navigate(['/app-finances/receitas/resumo']);
        }
      });
    }
  }

  estaValidoFormularioReceita(): boolean {
    if(this.formData.invalid || this.formValor.invalid || this.formCategoryId.invalid) {
      return false
    }
    else {
      return true;
    }
  }

  estaValidoFormularioCategoria(): boolean {
    if(this.formNomeCategoriaReceita.invalid) {
      return false
    }
    else {
      return true;
    }
  }
}
  