import { Component, OnInit } from '@angular/core';
import { BuscarComponent } from '../../components/movimentacao/buscar/buscar.component';
import { HeaderDashbordComponent } from '../../components/dashboard/header/header/header.component';
import { UltimasMovComponent } from '../../components/movimentacao/ultimas-mov/ultimas-mov.component';
import { PorCategoriaComponent } from '../../components/movimentacao/por-categoria/por-categoria.component';
import { ReceitasService } from '../../services/receitas.service';
import { ReceitaInterface } from '../../interface/receitas-interface';
import { CommonModule } from '@angular/common';
import { CategoriaReceitaService } from '../../services/categoria-receita.service';
import { TotalPorCategoriaInterface } from '../../interface/total_por_categoria-interface';

@Component({
  selector: 'app-receitas',
  standalone: true,
  imports: [BuscarComponent, HeaderDashbordComponent, UltimasMovComponent, PorCategoriaComponent, CommonModule],
  templateUrl: './receitas.component.html',
  styleUrl: './receitas.component.scss'
})
export class ReceitasComponent implements OnInit {
  
  constructor(private receitaService: ReceitasService, private categoriaReceitaService: CategoriaReceitaService) {}
  
  receitas: ReceitaInterface[] = [];
  totalPorCategoriaReceita: TotalPorCategoriaInterface[] = [];
  

  ngOnInit(): void {
    this.getReceitas(1);
    this.getTotalCategoriaReceitas(1);
  }
  
  getReceitas(userId: number) {
    this.receitaService.getReceitas(userId).subscribe(
    (receitas: ReceitaInterface[]) => {
    this.receitas = receitas;
    });
  }

  getTotalCategoriaReceitas(userId: number) {
    this.categoriaReceitaService.getTotalPorCategoriaReceita(userId).subscribe(
    (totalPorCategoriaReceita: TotalPorCategoriaInterface[]) => {
    this.totalPorCategoriaReceita = totalPorCategoriaReceita;
    });
  }

}
