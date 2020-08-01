import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { Token } from '../../../models/Token';
import { User } from '../../../models/User';
import { Subject } from 'rxjs';
import { MyProfileService } from '../my-profile.service';
import { AuthService } from '../../../services/auth.service';
import { takeUntil } from 'rxjs/operators';
import { fuseAnimations } from '../../../../../@fuse/animations';
import { DiagnosticsService } from '../../../services/diagnostics.service';

@Component({
    selector: 'app-diagnostic-info',
    templateUrl: './diagnostic-info.component.html',
    styleUrls: ['./diagnostic-info.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class DiagnosticInfoComponent implements OnInit, OnDestroy {
    about: any;
    public decodedToken: Token;
    public user: User;
    public openTestResult = 'Blocked';
    public userTestResult = 'Blocked';
    public managerTestResult = 'Blocked';
    public adminTestResult = 'Blocked';
    public developerTestResult = 'Blocked';

    // Private
    private _unsubscribeAll: Subject<any>;

    /**
     * Constructor
     *
     * @param {ProfileService} _profileService
     * @param authService
     * @param diagnosticsService
     */
    constructor(
        private _profileService: MyProfileService,
        private authService: AuthService,
        private diagnosticsService: DiagnosticsService
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

        this.getEndpointTestsResults();
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

    private getEndpointTestsResults(): void {
        // console.log('MyProfileComponent -> getEndpointTestsResults');
        this.diagnosticsService.getOpenEndpoint().subscribe(
            data => {
                this.openTestResult = data.value;
            },
            error => {
                console.error('Error: ', error);
                // this.authService.errorHandler(error);
            }
        );

        this.diagnosticsService.getUserEndpoint().subscribe(
            data => {
                this.userTestResult = data.value;
            },
            error => {
                console.error('Error: ', error);
                // this.authService.errorHandler(error);
            }
        );

        this.diagnosticsService.getManagerEndpoint().subscribe(
            data => {
                this.managerTestResult = data.value;
            },
            error => {
                console.error('Error: ', error);
                // this.authService.errorHandler(error);
            }
        );

        this.diagnosticsService.getAdminEndpoint().subscribe(
            data => {
                this.adminTestResult = data.value;
            },
            error => {
                console.error('Error: ', error);
                // this.authService.errorHandler(error);
            }
        );

        this.diagnosticsService.getDeveloperEndpoint().subscribe(
            data => {
                this.developerTestResult = data.value;
            },
            error => {
                console.error('Error: ', error);
                // this.authService.errorHandler(error);
            }
        );
    }
}
