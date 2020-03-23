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
            password: ['admin1', Validators.required]
        }, {});
    }

    ngAfterViewInit(): void {
    }

    public loginApp(): void {
        // console.log('email   : ' + this.loginForm.value.email);
        // console.log('password: ' + this.loginForm.value.password);
        this.authService.attemptAuth(this.loginForm.value.email, this.loginForm.value.password).subscribe(
            response => {
                console.log('LogonPage -> attemptLogin: ' + JSON.stringify(response));
                this.tokenService.saveToken(response.token);
                this.router.navigate(['/secured-pages/my-profile']).then();
            },
            error => {
                console.error('Error: ', error);
                this.displayError(error);
            }
        );
    }

    public toggleLoginFormVisible(): void {
        this.loginFormVisible = !this.loginFormVisible;
    }

    private getGoogleAuthConfig(): void {
        this.authService.getGoogleAuthConfig().subscribe(
            data => {
                console.log('GoogleAuthConfig:', data);
                this.googleClientId = data.clientId;
                this.googleRedirectUri = data.redirectUri;
            },
            error => {
                // console.error('Error: ', error);
                this.displayError(error.error);
            }
        );
    }

    private displayError(error): void {
        console.log('error', error);
        switch (error.error) {
            case 'Bad credentials':
                this.errorMessage = 'The username or password you entered is incorrect.';
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
            default:
                this.errorMessage = 'An unknown error occurred. ' + error.error.error;
        }
        this.loginForm.get('password').setErrors({customValidator: true});
        this.loginForm.get('password').markAsTouched();
    }
}
