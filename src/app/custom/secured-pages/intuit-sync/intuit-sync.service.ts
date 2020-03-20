import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {TokenService} from '../../services/token.service';
import {environment} from '../../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class IntuitSyncService {

    constructor(protected http: HttpClient,
                protected tokenService: TokenService) {
    }

    public getLastEmployeeSyncTimestamp(): Observable<any> {
        const token = this.tokenService.getToken();
        if (token) {
            return this.http.get<any>(environment.apiUrl + '/api/v1/settings/LastEmployeeSyncMillis/', {headers: this.setHeaders(token)});
        } else {
            console.error('No Token was present.');
            return null;
        }
    }

    public getLastUserListSyncTimestamp(): Observable<any> {
        const token = this.tokenService.getToken();
        if (token) {
            return this.http.get<any>(environment.apiUrl + '/api/v1/settings/LastUserSyncMillis/', {headers: this.setHeaders(token)});
        } else {
            console.error('No Token was present.');
            return null;
        }
    }

    public getLastTimeActivitySyncTimestamp(): Observable<any> {
        const token = this.tokenService.getToken();
        if (token) {
            return this.http.get<any>(environment.apiUrl + '/api/v1/settings/LastTimeActivitySyncMillis/', {headers: this.setHeaders(token)});
        } else {
            console.error('No Token was present.');
            return null;
        }
    }

    public syncEmployeeList(): Observable<any> {
        console.log('IntuitSyncService -> syncEmployeeList');
        const token = this.tokenService.getToken();
        if (token) {
            return this.http.post<any>(environment.apiUrl + '/api/v1/intuit-sync/sync-employee-list/', null, {headers: this.setHeaders(token)});
        } else {
            console.error('No Token was present.');
            return null;
        }
    }

    public syncUserListWithEmployeeList(): Observable<any> {
        console.log('IntuitSyncService -> syncUserListWithEmployeeList');
        const token = this.tokenService.getToken();
        if (token) {
            return this.http.post<any>(environment.apiUrl + '/api/v1/intuit-sync/sync-user-list-with-employee-list/', null, {headers: this.setHeaders(token)});
        } else {
            console.error('No Token was present.');
            return null;
        }
    }

    public compareTimeActivitySinceLastSync(): Observable<any> {
        console.log('IntuitSyncService -> compareTimeActivitySinceLastSync');
        const token = this.tokenService.getToken();
        if (token) {
            return this.http.post<any>(environment.apiUrl + '/api/v1/intuit-sync/compare-time-activity-changes/', null, {headers: this.setHeaders(token)});
        } else {
            console.error('No Token was present.');
            return null;
        }
    }

    public syncTimeActivitySinceLastSync(): Observable<any> {
        console.log('IntuitSyncService -> syncTimeActivitySinceLastSync');
        const token = this.tokenService.getToken();
        if (token) {
            return this.http.post<any>(environment.apiUrl + '/api/v1/intuit-sync/sync-time-activity-changes/', null, {headers: this.setHeaders(token)});
        } else {
            console.error('No Token was present.');
            return null;
        }
    }

    public syncTimeActivityMonth(): Observable<any> {
        console.log('IntuitSyncService -> syncTimeActivityMonth');
        const token = this.tokenService.getToken();
        if (token) {
            return this.http.post<any>(environment.apiUrl + '/api/v1/intuit-sync/sync-time-activity-month/', null, {headers: this.setHeaders(token)});
        } else {
            console.error('No Token was present.');
            return null;
        }
    }

    public syncTimeActivityFull(): Observable<any> {
        console.log('IntuitSyncService -> syncTimeActivityFull');
        const token = this.tokenService.getToken();
        if (token) {
            return this.http.post<any>(environment.apiUrl + '/api/v1/intuit-sync/sync-time-activity-full/', null, {headers: this.setHeaders(token)});
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
