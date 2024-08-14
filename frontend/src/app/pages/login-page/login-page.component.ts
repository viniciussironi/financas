import { Component } from '@angular/core';
import { LoginServiceService } from '../../services/login-service.service';

import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss'
})
export class LoginPageComponent {

  username = new FormControl();
  password = new FormControl();

  errorMessage: string = '';

  constructor(private loginService: LoginServiceService, private router: Router) {}

  getLogin() {
    this.loginService.logar(this.username.value, this.password.value).subscribe((response: any) => {
      localStorage.setItem('access_token', response.access_token);
      localStorage.setItem('expires_in', response.expires_in);
      localStorage.setItem('issued_at', Date.now().toString());
      this.router.navigate(['./app-finances/visao-geral']);
    },
      (error: any) => {
      this.errorMessage = error.error.error
    });
  }

}
