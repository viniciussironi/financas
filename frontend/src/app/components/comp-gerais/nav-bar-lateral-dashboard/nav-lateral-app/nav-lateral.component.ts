import { Component } from '@angular/core';

import { MenuComponent } from '../menu/menu.component';
import { RodapeComponent } from '../rodape/rodape.component';

@Component({
  selector: 'app-nav-lateral',
  standalone: true,
  imports: [
    MenuComponent,
    RodapeComponent
  ],
  templateUrl: './nav-lateral.component.html',
  styleUrl: './nav-lateral.component.scss'
})
export class NavLateralComponent {

}
