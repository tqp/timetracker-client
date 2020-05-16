import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {TokenService} from '../../../services/token.service';
import {Observable} from 'rxjs';
import {environment} from '../../../../../environments/environment';
import {FuelFill} from '../auto-tracker-models/FuelFill';
import {FuelActivity} from '../auto-tracker-models/FuelActivity';
import {ActivatedRouteSnapshot} from '@angular/router';
import {FuelActivityFlat} from '../auto-tracker-models/FuelActivityFlat';
import {FuelStation} from '../auto-tracker-models/FuelStation';
import {map} from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class FuelActivityService {

    constructor(private http: HttpClient,
                private _httpClient: HttpClient,
                private tokenService: TokenService) {
    }

    resolve(route: ActivatedRouteSnapshot): Observable<FuelActivity> {
        return this.getFuelActivityList();
    }

    // CRUD METHODS

    public createFuelActivity(fuelActivity: FuelFill): Promise<FuelFill> {
        const token = this.tokenService.getToken();
        if (token) {
            return new Promise((resolve, reject) => {
                this.http.post(environment.apiUrl + '/api/v1/auto/fuel-activity', {...fuelActivity}, {headers: this.tokenService.setAuthorizationHeader(token)})
                    .subscribe((response: any) => {
                        resolve(response);
                    });
            });
        } else {
            console.error('No token was present.');
            return null;
        }
    }

    public getFuelActivityList(): Observable<FuelActivity> {
        const token = this.tokenService.getToken();
        if (token) {
            return this.http.get<FuelActivity>(environment.apiUrl + '/api/v1/auto/fuel-activity', {headers: this.tokenService.setAuthorizationHeader(token)});
        } else {
            console.error('No token was present.');
            return null;
        }
    }

    public getFuelActivity(fillGuid: string): Observable<any> {
        const token = this.tokenService.getToken();
        if (token) {
            return this.http.get(environment.apiUrl + '/api/v1/auto/fuel-activity/' + fillGuid, {headers: this.tokenService.setAuthorizationHeader(token)});
        } else {
            console.error('No token was present.');
            return null;
        }
    }

    public updateFuelActivity(fuelFill: FuelFill): Promise<any> {
        const token = this.tokenService.getToken();
        if (token) {
            return new Promise((resolve, reject) => {
                this.http.put(environment.apiUrl + '/api/v1/auto/fuel-activity', {...fuelFill}, {headers: this.tokenService.setAuthorizationHeader(token)})
                    .subscribe(response => {
                        resolve(response);
                    });
            });
        } else {
            console.error('No token was present.');
            return null;
        }
    }

    public deleteFuelActivity(fillGuid: string): Promise<any> {
        const token = this.tokenService.getToken();
        if (token) {
            return new Promise((resolve, reject) => {
                this.http.delete(environment.apiUrl + '/api/v1/auto/fuel-activity/' + fillGuid, {headers: this.tokenService.setAuthorizationHeader(token)})
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

    public getFuelActivityListByStation(stationGuid: string): Observable<FuelActivity> {
        const token = this.tokenService.getToken();
        if (token) {
            return this.http.get<FuelActivity>(environment.apiUrl + '/api/v1/auto/fuel-activity/station/' +
                stationGuid, {headers: this.tokenService.setAuthorizationHeader(token)});
        } else {
            console.error('No token was present.');
            return null;
        }
    }

    public flattenFuelActivityObject(object: any): FuelActivityFlat {
        return object.map(item => {
            const fuelActivityFlatObject: FuelActivityFlat = {};
            fuelActivityFlatObject.fillGuid = item.fuelFill.fillGuid;
            fuelActivityFlatObject.fillDate = item.fuelFill.fillDate;
            fuelActivityFlatObject.fillOdometer = item.fuelFill.fillOdometer;
            fuelActivityFlatObject.stationAffiliation = item.fuelStation.stationAffiliation;
            fuelActivityFlatObject.stationLocation = item.fuelStation.stationCity + ', ' + item.fuelStation.stationState;
            fuelActivityFlatObject.fillMilesTraveled = item.fuelFill.fillMilesTraveled;
            fuelActivityFlatObject.fillGallons = item.fuelFill.fillGallons;
            fuelActivityFlatObject.fillCostPerGallon = item.fuelFill.fillCostPerGallon;
            fuelActivityFlatObject.fillTotalCost = item.fuelFill.fillTotalCost;
            fuelActivityFlatObject.fillMilesPerGallonCar = item.fuelFill.fillMilesPerGallon;
            fuelActivityFlatObject.fillMilesPerGallonCalc = item.fuelFill.fillMilesTraveled / item.fuelFill.fillGallons;
            fuelActivityFlatObject.fillComments = item.fuelFill.fillComments;
            return fuelActivityFlatObject;
        });
    }

    // AUTO-COMPLETE

    retrieveStationNameOptions(filter: string): Observable<FuelStation> {
        console.log('AutoCompleteService -> retrieveStationNameOptions: filter=', filter);
        const token = this.tokenService.getToken();
        const url = environment.apiUrl + '/api/v1/auto/fuel-station/auto-complete/station-name';
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

    private setHeaders(token: string): any {
        return new HttpHeaders()
            .set('Content-Type', 'application/json; charset-utf-8')
            .set('Authorization', 'Bearer ' + token);
    }

}
