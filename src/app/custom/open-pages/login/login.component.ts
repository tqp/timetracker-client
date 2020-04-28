import {AfterViewInit, Component, OnInit, ViewEncapsulation} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {FuseConfigService} from '@fuse/services/config.service';
import {fuseAnimations} from '@fuse/animations';
import {AuthService} from '../../services/auth.service';
import {TokenService} from '../../services/token.service';
import {Router} from '@angular/router';

import {v4 as uuid} from 'uuid';
import {animate, state, style, transition, trigger} from '@angular/animations';

@Component({
    selector: 'login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: [
        fuseAnimations,
        trigger('expandContract', [
            state('expanded', style({
                'max-height': '500px',
                'opacity': '1',
                'visibility': 'visible'
            })),
            state('contracted', style({
                'max-height': '0px',
                'opacity': '0',
                'visibility': 'hidden'
            })),
            transition('contracted => expanded', [
                animate('1ms ease-in-out', style({
                    opacity: '1'
                })),
                animate('200ms ease-in-out', style({
                    'max-height': '500px'
                })),
                animate('3ms ease-in-out', style({
                    visibility: 'visible'
                }))
            ]),
            transition('expanded => contracted', [
                animate('1ms ease-in-out', style({
                    opacity: '0'
                })),
                animate('200ms ease-in-out', style({
                    'max-height': '0px'
                })),
                animate('3ms ease-in-out', style({
                    visibility: 'hidden'
                }))
            ])
        ])
    ],
})
export class LoginComponent implements OnInit, AfterViewInit {
    public loginForm: FormGroup;
    public errorMessage: string;
    public csrfToken: string;
    public googleClientId: string;
    public googleRedirectUri: string;
    public loginFormVisible = false;

    /**
     * Constructor
     *
     * @param {FuseConfigService} _fuseConfigService
     * @param {FormBuilder} _formBuilder
     * @param authService
     * @param tokenService
     * @param router
     */
    constructor(
        private _fuseConfigService: FuseConfigService,
        private _formBuilder: FormBuilder,
        private authService: AuthService,
        protected tokenService: TokenService,
        protected router: Router
    ) {
        // Configure the layout
        this._fuseConfigService.config = {
            layout: {
                navbar: {
                    hidden: true
                },
                toolbar: {
                    hidden: true
                },
                footer: {
                    hidden: true
                },
                sidepanel: {
                    hidden: true
                }
            }
        };
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        this.csrfToken = uuid();
        this.getGoogleAuthConfig();

        this.loginForm = this._formBuilder.group({
            email: ['admin@mail.com', [Validators.required, Validators.email]],
            password: ['admin1', Validators.required],
            generalError: ['']
        }, {});
    }

    ngAfterViewInit(): void {
    }

    public loginApp(): void {
        // console.log('email   : ' + this.loginForm.value.email);
        // console.log('password: ' + this.loginForm.value.password);
        this.authService.attemptAuth(this.loginForm.value.email, this.loginForm.value.password).subscribe(
            response => {
                // console.log('LogonPage -> attemptLogin: ' + JSON.stringify(response));
                this.tokenService.saveToken(response.token);
                this.router.navigate(['/secured-pages/home']).then();
            },
            error => {
                console.error('Error: ', error.error);
                this.displayError(error.error);
            }
        );
    }

    public toggleLoginFormVisible(): void {
        this.loginFormVisible = !this.loginFormVisible;
    }

    private getGoogleAuthConfig(): void {
        this.authService.getGoogleAuthConfig().subscribe(
            data => {
                // console.log('GoogleAuthConfig:', data);
                this.googleClientId = data.clientId;
                this.googleRedirectUri = data.redirectUri;
                if (this.loginForm.get('generalError').hasError('customValidator')) {
                    console.log('Server connection restored.');
                    this.loginForm.get('generalError').setErrors(null);
                }
            },
            error => {
                console.error('Error: ', error);
                error.error = 'CannotConnectToServer';
                this.displayError(error.error);
            }
        );
    }

    private displayError(error): void {
        console.log('error: ', error);
        switch (error) {
            case 'Bad credentials':
                this.errorMessage = 'Incorrect username or password.';
                break;
            case 'UsernameNotFoundException':
                this.errorMessage = 'The user you logged in with doesn\'t have access to this site.';
                break;
            case 'LoggedOut':
                this.errorMessage = 'You have been logged out.';
                break;
            case 'UserDisabled':
                this.errorMessage = 'That User is currently disabled.';
                break;
            case 'CannotConnectToServer':
                this.errorMessage = 'Cannot connect to the Timetracker server.';
                // Check again to see if server is back up.
                setTimeout(() => {
                    console.log('Checking server connection...');
                    this.getGoogleAuthConfig();
                    if (this.loginForm.get('generalError').hasError('customValidator')) {
                        console.log('Still cannot connect to the Timetracker server.');
                    }
                }, 5000);
                break;
            default:
                this.errorMessage = 'An unknown error occurred.';
        }
        this.loginForm.get('generalError').setErrors({customValidator: true});
        this.loginForm.get('generalError').markAsTouched();
    }
}
