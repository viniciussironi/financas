import { Component, Input } from '@angular/core';
import { NotiMessagesComponent } from '../noti-messages/noti-messages.component';
import { UserLoginComponent } from '../user-login/user-login.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [NotiMessagesComponent, UserLoginComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderDashbordComponent {

  @Input()
  text:string = '';
}
