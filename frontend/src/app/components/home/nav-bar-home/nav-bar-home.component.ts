import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-nav-bar-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './nav-bar-home.component.html',
  styleUrl: './nav-bar-home.component.scss'
})
export class NavBarHomeComponent {

  @Input()
  title: string = '';
}
