import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { CanActivateFn } from '@angular/router';
import { AuthService } from '../services/auth.service';


export const roleGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const expectedRoles = route.data['roles'];

  if (authService.hasRole(expectedRoles)) {
    return true;
  } else {
    router.navigate(['/unauthorized']);
    return false;
  }
};
