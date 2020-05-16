import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {TokenService} from '../../../services/token.service';
import {environment} from '../../../../../environments/environment';
import {Observable} from 'rxjs';
import {ExpenseCategory} from '../auto-tracker-models/ExpenseCategory';

@Injectable({
  providedIn: 'root'
})
export class ExpenseCategoryService {

    constructor(private http: HttpClient,
                private tokenService: TokenService) {
    }

    // CRUD METHODS

    public createExpenseCategory(expenseCategory: ExpenseCategory): Promise<ExpenseCategory> {
        const token = this.tokenService.getToken();
        if (token) {
            return new Promise((resolve, reject) => {
                this.http.post(environment.apiUrl + '/api/v1/auto/expense-category', {...expenseCategory}, {headers: this.tokenService.setAuthorizationHeader(token)})
                    .subscribe((response: any) => {
                        resolve(response);
                    });
            });
        } else {
            console.error('No token was present.');
            return null;
        }
    }

    public getExpenseCategoryList(): Observable<any> {
        const token = this.tokenService.getToken();
        if (token) {
            return this.http.get(environment.apiUrl + '/api/v1/auto/expense-category', {headers: this.tokenService.setAuthorizationHeader(token)});
        } else {
            console.error('No token was present.');
            return null;
        }
    }

    public getExpenseCategory(vehicleGuid: string): Observable<any> {
        const token = this.tokenService.getToken();
        if (token) {
            return this.http.get(environment.apiUrl + '/api/v1/auto/expense-category/' + vehicleGuid, {headers: this.tokenService.setAuthorizationHeader(token)});
        } else {
            console.error('No token was present.');
            return null;
        }
    }

    public updateExpenseCategory(expenseCategory: ExpenseCategory): Promise<any> {
        const token = this.tokenService.getToken();
        if (token) {
            return new Promise((resolve, reject) => {
                this.http.put(environment.apiUrl + '/api/v1/auto/expense-category', {...expenseCategory}, {headers: this.tokenService.setAuthorizationHeader(token)})
                    .subscribe(response => {
                        resolve(response);
                    });
            });
        } else {
            console.error('No token was present.');
            return null;
        }
    }

    public deleteExpenseCategory(vehicleGuid: string): Promise<any> {
        const token = this.tokenService.getToken();
        if (token) {
            return new Promise((resolve, reject) => {
                this.http.delete(environment.apiUrl + '/api/v1/auto/expense-category/' + vehicleGuid, {headers: this.tokenService.setAuthorizationHeader(token)})
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
