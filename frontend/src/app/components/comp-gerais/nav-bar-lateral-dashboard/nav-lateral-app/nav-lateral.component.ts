import { Component } from '@angular/core';

import { MenuComponent } from '../menu/menu.component';

@Component({
  selector: 'app-nav-lateral',
  standalone: true,
  imports: [MenuComponent],
  templateUrl: './nav-lateral.component.html',
  styleUrl: './nav-lateral.component.scss'
})
export class NavLateralComponent {

}
