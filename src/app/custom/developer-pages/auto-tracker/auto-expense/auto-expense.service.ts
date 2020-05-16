import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {TokenService} from '../../../services/token.service';
import {AutoExpense} from '../auto-tracker-models/AutoExpense';
import {environment} from '../../../../../environments/environment';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AutoExpenseService {

    constructor(private http: HttpClient,
                private tokenService: TokenService) {
    }

    // CRUD METHODS

    public createAutoExpense(autoExpense: AutoExpense): Promise<AutoExpense> {
        const token = this.tokenService.getToken();
        if (token) {
            return new Promise((resolve, reject) => {
                this.http.post(environment.apiUrl + '/api/v1/auto/expense', {...autoExpense}, {headers: this.tokenService.setAuthorizationHeader(token)})
                    .subscribe((response: any) => {
                        resolve(response);
                    });
            });
        } else {
            console.error('No token was present.');
            return null;
        }
    }

    public getAutoExpenseList(): Observable<any> {
        const token = this.tokenService.getToken();
        if (token) {
            return this.http.get(environment.apiUrl + '/api/v1/auto/expense', {headers: this.tokenService.setAuthorizationHeader(token)});
        } else {
            console.error('No token was present.');
            return null;
        }
    }

    public getAutoExpense(expenseGuid: string): Observable<any> {
        const token = this.tokenService.getToken();
        if (token) {
            return this.http.get(environment.apiUrl + '/api/v1/auto/expense/' + expenseGuid, {headers: this.tokenService.setAuthorizationHeader(token)});
        } else {
            console.error('No token was present.');
            return null;
        }
    }

    public updateAutoExpense(autoExpense: AutoExpense): Promise<any> {
        const token = this.tokenService.getToken();
        if (token) {
            return new Promise((resolve, reject) => {
                this.http.put(environment.apiUrl + '/api/v1/auto/expense', {...autoExpense}, {headers: this.tokenService.setAuthorizationHeader(token)})
                    .subscribe(response => {
                        resolve(response);
                    });
            });
        } else {
            console.error('No token was present.');
            return null;
        }
    }

    public deleteAutoExpense(expenseGuid: string): Promise<any> {
        const token = this.tokenService.getToken();
        if (token) {
            return new Promise((resolve, reject) => {
                this.http.delete(environment.apiUrl + '/api/v1/auto/expense/' + expenseGuid, {headers: this.tokenService.setAuthorizationHeader(token)})
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
