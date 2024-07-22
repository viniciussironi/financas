import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { NavLateralComponent } from "../../components/comp-gerais/nav-bar-lateral-dashboard/nav-lateral-app/nav-lateral.component";

@Component({
  selector: 'app-app-financas',
  standalone: true,
  imports: [RouterOutlet, NavLateralComponent],
  templateUrl: './app-financas.component.html',
  styleUrl: './app-financas.component.scss'
})
export class AppFinancasComponent {}
