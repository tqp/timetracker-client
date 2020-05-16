import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {environment} from '../../../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {TokenService} from '../../../services/token.service';
import {FuelVehicle} from '../../auto-tracker/auto-tracker-models/FuelVehicle';
import {TimeTester} from './TimeTester';

@Injectable({
  providedIn: 'root'
})
export class TimeTesterService {

  constructor(private http: HttpClient,
              private tokenService: TokenService) { }

    public createTimeTester(timeTester: TimeTester): Promise<FuelVehicle> {
        const token = this.tokenService.getToken();
        if (token) {
            return new Promise((resolve, reject) => {
                this.http.post(environment.apiUrl + '/api/v1/sample-app/time-tester', {...timeTester}, {headers: this.tokenService.setAuthorizationHeader(token)})
                    .subscribe((response: any) => {
                        resolve(response);
                    });
            });
        } else {
            console.error('No token was present.');
            return null;
        }
    }

    public getTimeTesterList(): Observable<any> {
        const token = this.tokenService.getToken();
        if (token) {
            return this.http.get(environment.apiUrl + '/api/v1/sample-app/time-tester', {headers: this.tokenService.setAuthorizationHeader(token)});
        } else {
            console.error('No token was present.');
            return null;
        }
    }

    public getTimeTester(timeGuid: string): Observable<any> {
        const token = this.tokenService.getToken();
        if (token) {
            return this.http.get(environment.apiUrl + '/api/v1/sample-app/time-tester/' + timeGuid, {headers: this.tokenService.setAuthorizationHeader(token)});
        } else {
            console.error('No token was present.');
            return null;
        }
    }

    public updateTimeTester(timeTester: TimeTester): Promise<FuelVehicle> {
        const token = this.tokenService.getToken();
        if (token) {
            return new Promise((resolve, reject) => {
                this.http.put(environment.apiUrl + '/api/v1/sample-app/time-tester', {...timeTester}, {headers: this.tokenService.setAuthorizationHeader(token)})
                    .subscribe((response: any) => {
                        resolve(response);
                    });
            });
        } else {
            console.error('No token was present.');
            return null;
        }
    }
}
