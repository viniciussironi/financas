import { Component } from '@angular/core';
import { NavLateralComponent } from "../../components/comp-gerais/nav-bar-lateral-dashboard/nav-lateral-app/nav-lateral.component";
import { HeaderDashbordComponent } from '../../components/comp-gerais/header-dashboard/header-app/header.component';


@Component({
  selector: 'app-configuracoes',
  standalone: true,
  imports: [NavLateralComponent, HeaderDashbordComponent],
  templateUrl: './configuracoes.component.html',
  styleUrl: './configuracoes.component.scss'
})
export class ConfiguracoesComponent {

}
