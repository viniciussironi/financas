import { Component } from '@angular/core';

import { HeaderComponent } from '../../components/home/header/header.component';
import { ButtonHomeComponent } from '../../components/home/button-home/button-home.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    HeaderComponent, 
    ButtonHomeComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  
}
