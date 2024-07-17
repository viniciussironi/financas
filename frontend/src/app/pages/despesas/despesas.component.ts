import { Component, OnInit } from '@angular/core';
import { UltimasMovComponent } from '../../components/movimentacao/ultimas-mov/ultimas-mov.component';
import { PorCategoriaComponent } from '../../components/movimentacao/por-categoria/por-categoria.component';
import { BuscarComponent } from '../../components/movimentacao/buscar/buscar.component';
import { HeaderDashbordComponent } from '../../components/dashboard/header/header/header.component';
import { CommonModule } from '@angular/common';
import { DespesasService } from '../../services/despesas.service';
import { DespesaInterface } from '../../interface/despesas-interface';

@Component({
  selector: 'app-despesas',
  standalone: true,
  imports: [UltimasMovComponent, PorCategoriaComponent, BuscarComponent, HeaderDashbordComponent, CommonModule],
  templateUrl: './despesas.component.html',
  styleUrl: './despesas.component.scss'
})
export class DespesasComponent implements OnInit {
  
  constructor(private despesaService: DespesasService) {}
  
  despesas: DespesaInterface[] = [];
  

  ngOnInit(): void {
    this.getDespesas(1);
  }
  
  getDespesas(userId: number) {
    this.despesaService.getDespesas(userId).subscribe(
    (despesas: DespesaInterface[]) => {
    this.despesas = despesas;
    });
  }
}
