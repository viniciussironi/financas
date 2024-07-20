import { Component } from '@angular/core';

import { NavBarHomeComponent } from '../nav-bar-home/nav-bar-home.component';
import { LoginRegisterComponent } from '../login-register/login-register.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [NavBarHomeComponent, LoginRegisterComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

}
