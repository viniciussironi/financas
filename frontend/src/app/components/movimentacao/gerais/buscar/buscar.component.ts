import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

import { CategoriaInterface } from '../../../../interface/categoria-interface';

@Component({
  selector: 'app-buscar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './buscar.component.html',
  styleUrl: './buscar.component.scss'
})
export class BuscarComponent {

  @Input()
  listaCategorias: CategoriaInterface[] = [];
}
