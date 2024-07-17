import { Component, OnInit } from '@angular/core';
import { BuscarComponent } from '../../components/movimentacao/buscar/buscar.component';
import { HeaderDashbordComponent } from '../../components/dashboard/header/header/header.component';
import { UltimasMovComponent } from '../../components/movimentacao/ultimas-mov/ultimas-mov.component';
import { PorCategoriaComponent } from '../../components/movimentacao/por-categoria/por-categoria.component';
import { ReceitasService } from '../../services/receitas.service';
import { ReceitaInterface } from '../../interface/receitas-interface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-receitas',
  standalone: true,
  imports: [BuscarComponent, HeaderDashbordComponent, UltimasMovComponent, PorCategoriaComponent, CommonModule],
  templateUrl: './receitas.component.html',
  styleUrl: './receitas.component.scss'
})
export class ReceitasComponent implements OnInit {
  
  constructor(private receitaService: ReceitasService) {}
  
  receitas: ReceitaInterface[] = [];
  

  ngOnInit(): void {
    this.getReceitas(1);
  }
  
  getReceitas(userId: number) {
    this.receitaService.getReceitas(userId).subscribe(
    (receitas: ReceitaInterface[]) => {
    this.receitas = receitas;
    });
  }
}
