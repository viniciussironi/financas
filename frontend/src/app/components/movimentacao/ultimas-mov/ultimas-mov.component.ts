import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-ultimas-mov',
  standalone: true,
  imports: [],
  templateUrl: './ultimas-mov.component.html',
  styleUrl: './ultimas-mov.component.scss'
})
export class UltimasMovComponent {

  @Input()
  data: string = "";
  @Input()
  categoria: string = "";
  @Input()
  valor: number = 0;
  @Input()
  cor: string = "";
}
