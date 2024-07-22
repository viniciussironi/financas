import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { NavLateralComponent } from '../../../../components/comp-gerais/nav-bar-lateral-dashboard/nav-lateral-app/nav-lateral.component';

@Component({
  selector: 'app-add-despesa',
  standalone: true,
  imports: [RouterOutlet, NavLateralComponent],
  templateUrl: './add-despesa.component.html',
  styleUrl: './add-despesa.component.scss'
})
export class AddDespesaComponent {

}
