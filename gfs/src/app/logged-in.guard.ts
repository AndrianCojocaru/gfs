import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { ApiService } from './api.service';
import { Router } from '@angular/router';

export const loggedInGuard: CanActivateFn = (_route, _state) => {
  if (inject(ApiService).IsLoggedIn) {
    return true;
  } else {
    inject(Router).navigate(['/login']);
    return false;
  }
};
