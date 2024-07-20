import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-total-receita-despesa',
  standalone: true,
  imports: [],
  templateUrl: './total-receita-despesa.component.html',
  styleUrl: './total-receita-despesa.component.scss'
})
export class TotalReceitaDespesaComponent {

  @Input()
  total:number = 0;
  @Input()
  cor:string = "";
}
