import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderDashbordComponent } from '../../../components/comp-gerais/header-dashboard/header-app/header.component';

@Component({
  selector: 'app-despesas',
  standalone: true,
  imports: [RouterOutlet, HeaderDashbordComponent],
  templateUrl: './despesas.component.html',
  styleUrl: './despesas.component.scss'
})
export class DespesasComponent {
  
}

