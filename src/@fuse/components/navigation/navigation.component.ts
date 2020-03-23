import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { merge, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { FuseNavigationService } from '@fuse/components/navigation/navigation.service';
import { AuthService } from '../../../app/custom/services/auth.service';
import { TokenService } from '../../../app/custom/services/token.service';
import { TokenStorageService } from '../../../app/custom/services/token-storage.service';

@Component({
    selector: 'fuse-navigation',
    templateUrl: './navigation.component.html',
    styleUrls: ['./navigation.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.Default
})
export class FuseNavigationComponent implements OnInit {
    @Input()
    layout = 'vertical';

    @Input()
    navigation: any;

    public authorities: string;

    // Private
    private _unsubscribeAll: Subject<any>;

    /**
     *
     * @param {ChangeDetectorRef} _changeDetectorRef
     * @param {FuseNavigationService} _fuseNavigationService
     * @param authService
     * @param tokenService
     * @param tokenStorageService
     */
    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _fuseNavigationService: FuseNavigationService,
        private authService: AuthService,
        private tokenService: TokenService,
        private tokenStorageService: TokenStorageService
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
        // Load the navigation either from the input or from the service
        this.navigation = this.navigation || this._fuseNavigationService.getCurrentNavigation();

        // Subscribe to the current navigation changes
        this._fuseNavigationService.onNavigationChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(() => {

                // Load the navigation
                this.navigation = this._fuseNavigationService.getCurrentNavigation();

                // Mark for check
                this._changeDetectorRef.markForCheck();
            });

        // Subscribe to navigation item
        merge(
            this._fuseNavigationService.onNavigationItemAdded,
            this._fuseNavigationService.onNavigationItemUpdated,
            this._fuseNavigationService.onNavigationItemRemoved
        ).pipe(takeUntil(this._unsubscribeAll))
            .subscribe(() => {

                // Mark for check
                this._changeDetectorRef.markForCheck();
            });

        // TQP20200318
        // If a token is present, get the User's info.
        // For the cases where the page may load before the token has been obtained,
        // watch for changes to the token Observable. When we have a token, load the data.
        if (this.tokenService.getToken()) {
            this.getAuthoritiesFromToken();
        } else {
            this.tokenStorageService.tokenObs.subscribe(token => {
                this.getAuthoritiesFromToken();
            });
        }
    }

    private getAuthoritiesFromToken(): any {
        this.authService.getTokenInfo().subscribe(
            response => {
                this.authorities = response.authorities;
            },
            error => {
                // Do nothing
            }
        );
    }
}
