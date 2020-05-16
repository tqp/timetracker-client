import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {TokenService} from '../../../services/token.service';
import {environment} from '../../../../../environments/environment';
import {Observable} from 'rxjs';
import {Series} from '../reality-tracker-models/Series';

@Injectable({
    providedIn: 'root'
})
export class SeriesService {

    constructor(private http: HttpClient,
                private tokenService: TokenService) {
    }

    // CRUD METHODS

    public createSeries(series: Series): Promise<Series> {
        const token = this.tokenService.getToken();
        if (token) {
            return new Promise((resolve, reject) => {
                this.http.post(environment.apiUrl + '/api/v1/reality-tracker/series', {...series}, {headers: this.tokenService.setAuthorizationHeader(token)})
                    .subscribe((response: any) => {
                        resolve(response);
                    });
            });
        } else {
            console.error('No token was present.');
            return null;
        }
    }

    public getSeriesList(): Observable<any> {
        const token = this.tokenService.getToken();
        if (token) {
            return this.http.get(environment.apiUrl + '/api/v1/reality-tracker/series', {headers: this.tokenService.setAuthorizationHeader(token)});
        } else {
            console.error('No token was present.');
            return null;
        }
    }

    public getSeries(stationGuid: string): Observable<any> {
        const token = this.tokenService.getToken();
        if (token) {
            return this.http.get(environment.apiUrl + '/api/v1/reality-tracker/series/' + stationGuid, {headers: this.tokenService.setAuthorizationHeader(token)});
        } else {
            console.error('No token was present.');
            return null;
        }
    }

    public updateSeries(series: Series): Promise<any> {
        const token = this.tokenService.getToken();
        if (token) {
            return new Promise((resolve, reject) => {
                this.http.put(environment.apiUrl + '/api/v1/reality-tracker/series', {...series}, {headers: this.tokenService.setAuthorizationHeader(token)})
                    .subscribe(response => {
                        resolve(response);
                    });
            });
        } else {
            console.error('No token was present.');
            return null;
        }
    }

    public deleteSeries(stationGuid: string): Promise<any> {
        const token = this.tokenService.getToken();
        if (token) {
            return new Promise((resolve, reject) => {
                this.http.delete(environment.apiUrl + '/api/v1/reality-tracker/series/' + stationGuid, {headers: this.tokenService.setAuthorizationHeader(token)})
                    .subscribe(response => {
                        resolve(response);
                    });
            });
        } else {
            console.error('No token was present.');
            return null;
        }
    }
}
