import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {TokenService} from '../../services/token.service';
import {Observable} from 'rxjs';
import {SampleData} from './SampleData';
import {map} from 'rxjs/operators';
import {FuelStation} from '../../models/FuelStation';
import {environment} from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AutoCompleteService {

    constructor(private http: HttpClient,
                protected tokenService: TokenService) {
    }

    retrieveStationNameOptions(filter: string): Observable<FuelStation> {
        console.log('AutoCompleteService -> retrieveStationNameOptions: filter=', filter);
        const token = this.tokenService.getToken();
        const url = environment.apiUrl + '/api/v1/fuel/station/auto-complete/station-name';
        return this.http
            .get<FuelStation>(url, {
                headers: this.setHeaders(token),
                observe: 'response',
                params: {
                    filter: filter
                }
            })
            .pipe(
                map(res => {
                    return res.body;
                })
            );
    }

    retrieveLastNameOptions(filter: string): Observable<SampleData> {
        console.log('AutoCompleteService -> retrieveLastNameOptions: filter=', filter);
        const token = this.tokenService.getToken();
        const url = '/api/v1/sample-data/auto-complete-last-name';
        return this.http
            .get<SampleData>(url, {
                headers: this.setHeaders(token),
                observe: 'response',
                params: {
                    filter: filter
                }
            })
            .pipe(
                map(res => {
                    return res.body;
                })
            );
    }

    retrieveAddressOptions(filter: string): Observable<SampleData> {
        console.log('AutoCompleteService -> retrieveAddressOptions: filter=', filter);
        const token = this.tokenService.getToken();
        const url = '/api/v1/sample-data/auto-complete-address';
        return this.http
            .get<SampleData>(url, {
                headers: this.setHeaders(token),
                observe: 'response',
                params: {
                    filter: filter
                }
            })
            .pipe(
                map(res => {
                    return res.body;
                })
            );
    }

    private setHeaders(token: string): any {
        return new HttpHeaders()
            .set('Content-Type', 'application/json; charset-utf-8')
            .set('Authorization', 'Bearer ' + token);
    }
}
