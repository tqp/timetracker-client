import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {TokenService} from '../../services/token.service';
import {BehaviorSubject, Observable} from 'rxjs';
import {environment} from '../../../../environments/environment';
import {FuelActivity} from '../../models/FuelActivity';
import {Contact} from '../../../main/apps/contacts/contact.model';

@Injectable({
    providedIn: 'root'
})
export class FuelActivityService {

    contacts: Contact[];
    user: any;
    onContactsChanged: BehaviorSubject<any>;
    searchText: string;
    filterBy: string;


    constructor(private http: HttpClient,
                private _httpClient: HttpClient,
                private tokenService: TokenService) {
    }

    public getContacts(): Observable<any> {
        const token = this.tokenService.getToken();
        if (token) {
            return this.http.get('api/contacts-contacts');
        } else {
            console.error('No token was present.');
            return null;
        }
    }

    public createFuelActivity(fuelActivity: FuelActivity): Promise<any> {
        const token = this.tokenService.getToken();
        if (token) {
            return new Promise((resolve, reject) => {
                this.http.post(environment.apiUrl + '/api/v1/fuel/activity', {...fuelActivity}, {headers: this.tokenService.setAuthorizationHeader(token)})
                    .subscribe(response => {
                        resolve(response);
                    });
            });
        } else {
            console.error('No token was present.');
            return null;
        }
    }

    public getFuelActivityList(): Observable<any> {
        const token = this.tokenService.getToken();
        if (token) {
            return this.http.get(environment.apiUrl + '/api/v1/fuel/activity', {headers: this.tokenService.setAuthorizationHeader(token)});
        } else {
            console.error('No token was present.');
            return null;
        }
    }

    public updateFuelActivity(fuelActivity: FuelActivity): Promise<any> {
        const token = this.tokenService.getToken();
        if (token) {
            return new Promise((resolve, reject) => {
                this.http.put(environment.apiUrl + '/api/v1/fuel/activity', {...fuelActivity}, {headers: this.tokenService.setAuthorizationHeader(token)})
                    .subscribe(response => {
                        resolve(response);
                    });
            });
        } else {
            console.error('No token was present.');
            return null;
        }
    }

    public deleteFuelActivity(fuelActivity: FuelActivity): Promise<any> {
        const token = this.tokenService.getToken();
        if (token) {
            return new Promise((resolve, reject) => {
                this.http.delete(environment.apiUrl + '/api/v1/fuel/activity/' + fuelActivity.fuelActivityGuid, {headers: this.tokenService.setAuthorizationHeader(token)})
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
