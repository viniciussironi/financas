import { Component, OnInit } from '@angular/core';

import { AddMovimentacaoComponent } from "../../../../components/formularios/add-movimentacao/add-movimentacao.component";

import { CategoriaReceitaService } from '../../../../services/categoria-receita.service';

import { CategoriaInterface } from '../../../../interface/categoria-interface';

@Component({
  selector: 'app-add-receita',
  standalone: true,
  imports: [AddMovimentacaoComponent],
  templateUrl: './add-receita.component.html',
  styleUrl: './add-receita.component.scss'
})
export class AddReceitaComponent implements OnInit {

  listaCategoria: CategoriaInterface[] = [];

  constructor(private categoriaReceitaService: CategoriaReceitaService) {}
  
  ngOnInit(): void {
    this.getCategorias();
  }

  getCategorias() {
    this.categoriaReceitaService.getCategoriasReceitas().subscribe(
    (listaCategoria: CategoriaInterface[]) => {
      this.listaCategoria = listaCategoria;
    });
  }



}
