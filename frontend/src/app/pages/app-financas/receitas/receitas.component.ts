import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { HeaderDashbordComponent } from '../../../components/comp-gerais/header-app/header.component';


@Component({
  selector: 'app-receitas',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    HeaderDashbordComponent
],
  templateUrl: './receitas.component.html',
  styleUrl: './receitas.component.scss'
})
export class ReceitasComponent {
  
}
