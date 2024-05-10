import { inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Store, select } from '@ngrx/store';
import { Observable, map } from 'rxjs';
import { AppState } from '../store/app.state';
import { isAuthenticated } from '../auth/state/auth.selector';

export const AuthGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot): any => {
    let store = inject(Store);
    let router = inject(Router);
   return store.select(isAuthenticated).pipe(
      map(authenticate =>{
        if(!authenticate){
          return router.navigate(['auth'])
        }
      return true
      })
    )
};
