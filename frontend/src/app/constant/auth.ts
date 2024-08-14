
import { Injectable, inject } from '@angular/core';
import { Router, CanActivateFn } from '@angular/router';
import { LoginServiceService } from '../services/login-service.service';



@Injectable({
  providedIn: 'root'
})
export class PermissionsService { 

  constructor(private loginService: LoginServiceService, private router: Router) { }

  canActivate(): boolean {
    if (this.loginService.estaLogado()) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }

}
export const canActivateAdmin: CanActivateFn = () => {
  return inject(PermissionsService).canActivate();
};