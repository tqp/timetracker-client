import {Injectable} from '@angular/core';
import {SearchParams} from '../../models/SearchParams';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {TokenService} from '../../services/token.service';
import {environment} from '../../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class TimeActivityService {

    constructor(private http: HttpClient,
                private tokenService: TokenService) {
    }

    public getTimeActivityRowCount(searchParams: SearchParams): Observable<any> {
        const token = this.tokenService.getToken();
        if (token) {
            return this.http.post(environment.apiUrl + '/api/v1/time-activity/count/', searchParams, {headers: this.tokenService.setAuthorizationHeader(token)});
        } else {
            console.error('No token was present.');
            return null;
        }
    }

    public getTimeActivity(searchParams: SearchParams): Observable<any> {
        const token = this.tokenService.getToken();
        if (token) {
            return this.http.post(environment.apiUrl + '/api/v1/time-activity/', searchParams, {headers: this.tokenService.setAuthorizationHeader(token)});
        } else {
            console.error('No token was present.');
            return null;
        }
    }
}
