import {Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {Token} from '../../../models/Token';
import {User} from '../../../models/User';
import {Subject} from 'rxjs';
import {MyProfileService} from '../my-profile.service';
import {AuthService} from '../../../services/auth.service';
import {TokenService} from '../../../services/token.service';
import {UserProfileService} from '../../../services/user-profile.service';
import {takeUntil} from 'rxjs/operators';
import * as moment from 'moment';
import {fuseAnimations} from '../../../../../@fuse/animations';

@Component({
    selector: 'app-token-info',
    templateUrl: './token-info.component.html',
    styleUrls: ['./token-info.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations

})
export class TokenInfoComponent implements OnInit, OnDestroy {
    about: any;
    public decodedToken: Token;
    public user: User;

    // Private
    private _unsubscribeAll: Subject<any>;

    /**
     * Constructor
     *
     * @param {ProfileService} _profileService
     * @param authService
     * @param tokenService
     * @param userProfileService
     */
    constructor(
        private _profileService: MyProfileService,
        private authService: AuthService,
        public tokenService: TokenService,
        private userProfileService: UserProfileService
    ) {
        // Set the private defaults
        this._unsubscribeAll = new Subject();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        this._profileService.aboutOnChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(about => {
                this.about = about;
            });

        this.getTokenInformation();
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

    private getTokenInformation(): any {
        this.authService.getTokenInfo().subscribe(
            response => {
                console.log('response', response);
                this.decodedToken = response;
                this.decodedToken.authorities = this.decodedToken.authorities.replace(/,/g, ', ');
                this.decodedToken.iatText = moment(this.decodedToken.iat * 1000).format('DD-MMM-YYYY h:mm:ss a').toUpperCase();
                this.decodedToken.expText = moment(this.decodedToken.exp * 1000).format('DD-MMM-YYYY h:mm:ss a').toUpperCase();
            },
            error => {
                console.error('Error: ', error);
                this.authService.errorHandler(error);
            }
        );
    }
}
