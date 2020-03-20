import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../models/User';
import { TokenService } from './token.service';
import { environment } from '../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class IntuitAuthService {

    constructor(protected http: HttpClient,
                protected tokenService: TokenService) {
    }

    public getIntuitProductionTokenConfig(): Observable<any> {
        const token = this.tokenService.getToken();
        if (token) {
            return this.http.get<User>(environment.apiUrl + '/api/v1/intuit-token/production-token-config/', {headers: this.setHeaders(token)});
        } else {
            console.error('No Token was present.');
            // this.router.navigate(['/login-page']).then();
            return null;
        }
    }

    public getIntuitProductionTokenInfo(): Observable<any> {
        const token = this.tokenService.getToken();
        if (token) {
            return this.http.get<User>(environment.apiUrl + '/api/v1/intuit-token/production-token-info/', {headers: this.setHeaders(token)});
        } else {
            console.error('No Token was present.');
            // this.router.navigate(['/login-page']).then();
            return null;
        }
    }

    public refreshProductionAccessToken(): Observable<any> {
        const token = this.tokenService.getToken();
        if (token) {
            return this.http.get<User>(environment.apiUrl + '/api/v1/intuit-token/refresh-production-access-token/', {headers: this.setHeaders(token)});
        } else {
            console.error('No Token was present.');
            return null;
        }
    }

    private setHeaders(token: string): any {
        return new HttpHeaders()
            .set('Content-Type', 'application/json; charset-utf-8')
            .set('Authorization', 'Bearer ' + token);
    }

}
