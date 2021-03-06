import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {TokenService} from '../../services/token.service';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HolidayListService {

  constructor(private http: HttpClient,
              private tokenService: TokenService) { }

    public getHolidayList(): Observable<any> {
        const token = this.tokenService.getToken();
        if (token) {
            return this.http.get(environment.apiUrl + '/api/v1/holiday/', {headers: this.tokenService.setAuthorizationHeader(token)});
        } else {
            console.error('No token was present.');
            return null;
        }
    }


}
