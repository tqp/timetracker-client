import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {TokenService} from '../../../services/token.service';
import {Observable} from 'rxjs';
import {environment} from '../../../../../environments/environment';
import {FuelStation} from '../auto-tracker-models/FuelStation';

@Injectable({
    providedIn: 'root'
})
export class FuelStationService {

    constructor(private http: HttpClient,
                private tokenService: TokenService) {
    }

    // CRUD METHODS

    public createFuelStation(fuelStation: FuelStation): Promise<FuelStation> {
        const token = this.tokenService.getToken();
        if (token) {
            return new Promise((resolve, reject) => {
                this.http.post(environment.apiUrl + '/api/v1/auto/fuel-station', {...fuelStation}, {headers: this.tokenService.setAuthorizationHeader(token)})
                    .subscribe((response: any) => {
                        resolve(response);
                    });
            });
        } else {
            console.error('No token was present.');
            return null;
        }
    }

    public getFuelStationList(): Observable<any> {
        const token = this.tokenService.getToken();
        if (token) {
            return this.http.get(environment.apiUrl + '/api/v1/auto/fuel-station', {headers: this.tokenService.setAuthorizationHeader(token)});
        } else {
            console.error('No token was present.');
            return null;
        }
    }

    public getFuelStation(stationGuid: string): Observable<any> {
        const token = this.tokenService.getToken();
        if (token) {
            return this.http.get(environment.apiUrl + '/api/v1/auto/fuel-station/' + stationGuid, {headers: this.tokenService.setAuthorizationHeader(token)});
        } else {
            console.error('No token was present.');
            return null;
        }
    }

    public updateFuelStation(fuelStation: FuelStation): Promise<any> {
        const token = this.tokenService.getToken();
        if (token) {
            return new Promise((resolve, reject) => {
                this.http.put(environment.apiUrl + '/api/v1/auto/fuel-station', {...fuelStation}, {headers: this.tokenService.setAuthorizationHeader(token)})
                    .subscribe(response => {
                        resolve(response);
                    });
            });
        } else {
            console.error('No token was present.');
            return null;
        }
    }

    public deleteFuelStation(stationGuid: string): Promise<any> {
        const token = this.tokenService.getToken();
        if (token) {
            return new Promise((resolve, reject) => {
                this.http.delete(environment.apiUrl + '/api/v1/auto/fuel-station/' + stationGuid, {headers: this.tokenService.setAuthorizationHeader(token)})
                    .subscribe(response => {
                        resolve(response);
                    });
            });
        } else {
            console.error('No token was present.');
            return null;
        }
    }

    // SUPPORT METHODS

}
