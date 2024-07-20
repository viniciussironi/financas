import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TotalPorCategoriaInterface } from '../../../interface/total_por_categoria-interface';

@Component({
  selector: 'app-total-ultimos-meses',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './total-ultimos-meses.component.html',
  styleUrl: './total-ultimos-meses.component.scss'
})
export class TotalUltimosMesesComponent {

  @Input()
  titulo:string = "";
  @Input()
  listaCategoria: TotalPorCategoriaInterface[] = [];
  @Input()
  cor: string = "";
}
