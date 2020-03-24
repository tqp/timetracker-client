import { Component, Input, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
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
    selector: 'app-user-info',
    templateUrl: './user-info.component.html',
    styleUrls: ['./user-info.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class UserInfoComponent implements OnInit, OnDestroy {
    about: any;
    public decodedToken: Token;
    // public user: User;

    @Input()
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
        protected authService: AuthService,
        protected tokenService: TokenService,
        protected userProfileService: UserProfileService
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

        // this.getMyUserInfo();

        if (this.user.lastLogin) {
            this.user.lastLogin = moment(this.user.lastLogin).format('DD-MMM-YYYY h:mm:ss a').toUpperCase();
        } else {
            this.user.lastLogin = 'User has never logged in.';
        }
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

    // private getMyUserInfo(): any {
    //     this.userProfileService.getMyUserInfo().subscribe(
    //         response => {
    //             // console.log('response', response);
    //             this.user = response;
    //             if (this.user.lastLogin) {
    //                 this.user.lastLogin = moment(this.user.lastLogin).format('DD-MMM-YYYY h:mm:ss a').toUpperCase();
    //             } else {
    //                 this.user.lastLogin = 'User has never logged in.';
    //             }
    //         },
    //         error => {
    //             console.error('Error: ', error);
    //             this.authService.errorHandler(error);
    //         }
    //     );
    // }
}
