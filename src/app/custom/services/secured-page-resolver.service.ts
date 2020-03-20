import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { ActivatedRouteSnapshot, Resolve, Router } from '@angular/router';
import { EMPTY, Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class SecuredPageResolverService implements Resolve<any> {

    constructor(private router: Router,
                private authService: AuthService) {
    }

    resolve(route: ActivatedRouteSnapshot): Observable<any> {
        this.authService.isAuthenticated().subscribe(response => {
            console.log('response', response);
            if (response === false) {
                this.router.navigate(['/open-pages/login']).then();
            }
        });
        return EMPTY;
    }
}

