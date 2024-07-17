import { Component } from '@angular/core';
import { NavLateralComponent } from '../../components/dashboard/nav/nav-lateral/nav-lateral.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-finances',
  standalone: true,
  imports: [NavLateralComponent, RouterOutlet],
  templateUrl: './finances.component.html',
  styleUrl: './finances.component.scss'
})
export class FinancesComponent {

}
