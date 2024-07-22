import { Component } from '@angular/core';

import { NavLateralComponent } from "../../../components/comp-gerais/nav-bar-lateral-dashboard/nav-lateral-app/nav-lateral.component";
import { HeaderDashbordComponent } from '../../../components/comp-gerais/header-dashboard/header-app/header.component';
import { FormContaComponent } from "../../../components/formularios/form-conta/form-conta.component";

@Component({
  selector: 'app-conta',
  standalone: true,
  imports: [
    HeaderDashbordComponent,
    NavLateralComponent,
    FormContaComponent,
],
  templateUrl: './conta.component.html',
  styleUrl: './conta.component.scss'
})
export class ContaComponent {

}
