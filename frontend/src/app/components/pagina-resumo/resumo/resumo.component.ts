import { DecimalPipe } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-resumo-dashboard',
  standalone: true,
  imports: [DecimalPipe],
  templateUrl: './resumo.component.html',
  styleUrl: './resumo.component.scss',
})
export class ResumoDashboardComponent {

  @Input()
  title: string = "";
  @Input()
  icon: string = "";
  @Input()
  amount: number = 0; 
  @Input()
  cor: string = "";
  @Input()
  espacamento: string = "";
}
