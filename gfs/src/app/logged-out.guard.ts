import { inject } from '@angular/core';
import { CanDeactivateFn } from '@angular/router';
import { ApiService } from './api.service';
import { Router } from '@angular/router';

export const loggedOutGuard: CanDeactivateFn<unknown> = (component, currentRoute, currentState, nextState) => {
  if (!inject(ApiService).IsLoggedIn) {
    return true;
  } else {
    inject(Router).navigate(['/login']);
    return false;
  }
};