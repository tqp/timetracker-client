import { Injectable } from '@angular/core';
import { HttpClient, HttpEventType, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { TokenService } from '../../services/token.service';
import { environment } from '../../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class FileUploadService {

    constructor(private http: HttpClient,
                private tokenService: TokenService) {
    }

    public getObjectList(): Observable<any> {
        const token = this.tokenService.getToken();
        if (token) {
            return this.http.get(environment.apiUrl + '/api/v1/s3/', {headers: this.tokenService.setAuthorizationHeader(token)});
        } else {
            console.error('No token was present.');
            return null;
        }
    }

    public uploadMultipartFile(payload: any): Observable<any> {
        const token = this.tokenService.getToken();
        if (token) {

            const headers = new HttpHeaders({
                Accept: 'application/json',
                Authorization: `Bearer ${token}`
            });

            return this.http.post<string>(
                environment.apiUrl + '/api/v1/s3/upload-multipart-file/',
                payload,
                {headers: headers}
            );
        } else {
            console.error('No token was present.');
            return null;
        }
    }

    public upload(data, userId): any {
        console.log('FileUploadService -> upload', data);
        const endpoint = environment.apiUrl + '/api/vi/file/upload';

        return this.http.post<any>(endpoint, data, {
            reportProgress: true,
            observe: 'events'
        }).pipe(map((event) => {
            switch (event.type) {
                case HttpEventType.UploadProgress:
                    const progress = Math.round(100 * event.loaded / event.total);
                    return {status: 'progress', message: progress};
                case HttpEventType.Response:
                    return event.body;
                default:
                    return 'Unhandled event: ${event.type}';
            }
        }));
    }

    public download(file: string): any {
        const endpoint = environment.apiUrl + '/api/v1/file/download/' + file;
        const body = {filename: file};
        return this.http.post(endpoint, body, {
            responseType: 'blob',
            headers: new HttpHeaders().append('Content-Type', 'application/pdf')
        });
    }

    public deleteObject(object: any): Observable<any> {
        const token = this.tokenService.getToken();
        if (token) {
            return this.http.delete(environment.apiUrl + '/api/v1/s3/' + object.key, {headers: this.tokenService.setAuthorizationHeader(token)});
        } else {
            console.error('No token was present.');
            return null;
        }
    }

}
