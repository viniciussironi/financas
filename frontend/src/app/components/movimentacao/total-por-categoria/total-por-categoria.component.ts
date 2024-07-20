import { Component, Input } from '@angular/core';
import { TotalPorCategoriaInterface } from '../../../interface/total_por_categoria-interface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-total-por-categoria',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './total-por-categoria.component.html',
  styleUrl: './total-por-categoria.component.scss'
})
export class TotalPorCategoriaComponent {

  @Input()
  titulo:string = "";
  @Input()
  listaCategoria: TotalPorCategoriaInterface[] = [];
  @Input()
  cor: string = "";
}
