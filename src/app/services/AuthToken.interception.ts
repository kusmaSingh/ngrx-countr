import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpEvent,
  HttpHandler,
  HttpRequest,
} from '@angular/common/http';
import { Observable, exhaustMap } from 'rxjs';
import { Store } from '@ngrx/store';
import { getToken } from '../auth/state/auth.selector';

@Injectable()
export class AuthTokenInterceptor implements HttpInterceptor {
  constructor(private store : Store){

  }
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return this.store.select(getToken).pipe(
      exhaustMap(resToken=>{
        if(!resToken){
          return next.handle(req);
        }
        let modifiedReq = req.clone({
          params : req.params.append('auth', resToken),
        }) ;
        return next.handle(modifiedReq)
      })
    )
  }
}
