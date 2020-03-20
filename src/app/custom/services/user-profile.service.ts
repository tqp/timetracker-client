import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { TokenService } from './token.service';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { User } from '../models/User';
import { Role } from '../models/Role';
import { environment } from '../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class UserProfileService {

    constructor(protected http: HttpClient,
                protected router: Router,
                protected tokenService: TokenService) {
    }

    public getMyProfile(): Observable<any> {
        const token = this.tokenService.getToken();
        if (token) {
            return this.http.get(environment.apiUrl + '/api/v1/my-profile/', {headers: this.setHeaders(token)})
                .pipe(
                    map(response => {
                        return response;
                    }),
                    catchError(e => {
                        console.error('Error getting your User information: ' + e);
                        this.router.navigate(['/login-page']).then();
                        return throwError(e);
                    })
                );
        } else {
            console.error('No Token was present.');
            this.router.navigate(['/login-page']).then();
            return null;
        }
    }

    public getMyUserInfo(): Observable<User> {
        const token = this.tokenService.getToken();
        if (token) {
            return this.http.get<User>(environment.apiUrl + '/api/v1/my-profile/', {headers: this.setHeaders(token)}).pipe(
                switchMap(user => {
                    return this.http.get<Role[]>(environment.apiUrl + '/api/v1/my-profile/roles', {headers: this.setHeaders(token)})
                        .pipe(
                            map(roles => {
                                user.roles = roles;
                                return user;
                            }),
                            catchError(e => {
                                console.error('Error getting your User and Role information: ' + e);
                                return throwError(e);
                            })
                        );
                })
            );
        } else {
            console.error('No Token was present.');
            this.router.navigate(['/login-page']).then();
        }
    }

    public getUserIdByUsername(username: string): Observable<any> {
        const token = this.tokenService.getToken();
        if (token) {
            return this.http.get(environment.apiUrl + '/api/v1/my-profile/username' + username, {headers: this.setHeaders(token)});
        }
    }

    public updateMyProfile(submittedUserData: User): Observable<any> {
        // console.log('UserProfileService -> updateMyProfile', submittedUserData);
        const token = this.tokenService.getToken();
        if (token) {
            // Update User
            return this.http.put(environment.apiUrl + '/api/v1/my-profile/', submittedUserData, {headers: this.setHeaders(token)});
        } else {
            console.error('No Token was present.');
            this.router.navigate(['/login-page']).then();
            return null;
        }
    }

    public confirmPassword(passwordInfo: User): Observable<any> {
        console.log('UserProfileService -> confirmPassword', passwordInfo);
        const token = this.tokenService.getToken();
        if (token) {
            return this.http.put(environment.apiUrl + '/api/v1/my-profile/confirm-password', passwordInfo, {headers: this.setHeaders(token)});
        } else {
            console.error('No Token was present.');
            this.router.navigate(['/login-page']).then();
            return null;
        }
    }

    public changePassword(newPasswordInfo: User): Observable<any> {
        console.log('UserProfileService -> changePassword: userGuid' + newPasswordInfo.userGuid + ', password=' + newPasswordInfo.password);
        const token = this.tokenService.getToken();
        if (token) {
            return this.http.put(environment.apiUrl + '/api/v1/my-profile/password/', newPasswordInfo, {headers: this.setHeaders(token)});
        } else {
            console.error('No Token was present.');
            this.router.navigate(['/login-page']).then();
            return null;
        }
    }

    private setHeaders(token: string): any {
        return new HttpHeaders()
            .set('Content-Type', 'application/json; charset-utf-8')
            .set('Authorization', 'Bearer ' + token);
    }
}
