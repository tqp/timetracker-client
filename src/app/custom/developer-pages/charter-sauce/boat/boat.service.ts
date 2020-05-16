import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {TokenService} from '../../../services/token.service';
import {environment} from '../../../../../environments/environment';
import {Observable} from 'rxjs';
import {Boat} from '../charter-sauce-models/Boat';

@Injectable({
  providedIn: 'root'
})
export class BoatService {

    constructor(private http: HttpClient,
                private tokenService: TokenService) {
    }

    // CRUD METHODS

    public createBoat(boat: Boat): Promise<Boat> {
        const token = this.tokenService.getToken();
        if (token) {
            return new Promise((resolve, reject) => {
                this.http.post(environment.apiUrl + '/api/v1/charter-sauce/boat', {...boat}, {headers: this.tokenService.setAuthorizationHeader(token)})
                    .subscribe((response: any) => {
                        resolve(response);
                    });
            });
        } else {
            console.error('No token was present.');
            return null;
        }
    }

    public getBoatList(): Observable<any> {
        const token = this.tokenService.getToken();
        if (token) {
            return this.http.get(environment.apiUrl + '/api/v1/charter-sauce/boat', {headers: this.tokenService.setAuthorizationHeader(token)});
        } else {
            console.error('No token was present.');
            return null;
        }
    }

    public getBoat(stationGuid: string): Observable<any> {
        const token = this.tokenService.getToken();
        if (token) {
            return this.http.get(environment.apiUrl + '/api/v1/charter-sauce/boat/' + stationGuid, {headers: this.tokenService.setAuthorizationHeader(token)});
        } else {
            console.error('No token was present.');
            return null;
        }
    }

    public updateBoat(boat: Boat): Promise<any> {
        const token = this.tokenService.getToken();
        if (token) {
            return new Promise((resolve, reject) => {
                this.http.put(environment.apiUrl + '/api/v1/charter-sauce/boat', {...boat}, {headers: this.tokenService.setAuthorizationHeader(token)})
                    .subscribe(response => {
                        resolve(response);
                    });
            });
        } else {
            console.error('No token was present.');
            return null;
        }
    }

    public deleteBoat(stationGuid: string): Promise<any> {
        const token = this.tokenService.getToken();
        if (token) {
            return new Promise((resolve, reject) => {
                this.http.delete(environment.apiUrl + '/api/v1/charter-sauce/boat/' + stationGuid, {headers: this.tokenService.setAuthorizationHeader(token)})
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
