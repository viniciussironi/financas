import { Component, Input } from '@angular/core';


@Component({
  selector: 'app-por-categoria',
  standalone: true,
  imports: [ ],
  templateUrl: './por-categoria.component.html',
  styleUrl: './por-categoria.component.scss',
})
export class PorCategoriaComponent {

  @Input()
  nome: string = "";
  @Input()
  total: number = 0;
  @Input()
  cor: string = "";
}
