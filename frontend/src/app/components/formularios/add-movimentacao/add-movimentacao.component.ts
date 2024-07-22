import { Component, Input } from '@angular/core';
import { CategoriaInterface } from '../../../interface/categoria-interface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-movimentacao',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './add-movimentacao.component.html',
  styleUrl: './add-movimentacao.component.scss'
})
export class AddMovimentacaoComponent {

  @Input() 
  titulo: string = '';
  @Input()
  listaCategorias: CategoriaInterface[] = [];

}
