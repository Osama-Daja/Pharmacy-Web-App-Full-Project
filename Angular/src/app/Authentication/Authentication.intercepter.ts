import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable()
export class Authenticationintercepter implements HttpInterceptor{
    constructor(private router: Router) {

    }

    intercept(req: HttpRequest<any>, Handler: HttpHandler): Observable<HttpEvent<any>> {
        if (localStorage.getItem('token') != null) {
            const MyReq = req.clone({
                headers: req.headers.set('Authorization', 'Bearer ' + localStorage.getItem('token'))
            });
            return Handler.handle(MyReq).pipe(
                tap(
                    res => { },
                    Error => {
                        if (Error.status == 401) {
                            localStorage.removeItem('token');
                            this.router.navigate(['/home']);
                        } else if (Error.status == 403) {
                            this.router.navigate(['/forbidden']);
                        }
                    }
                )
            );
        } else {
            return Handler.handle(req.clone());
        }
    }
}
