# TimeTracker Client    

### Changes from the Fuse Template

Standard Custom Changes
- src/index.html: 
    - set title to 'TimeTracker'
    - update logo image
- src/assets/custom:
    - migrate assets (logos)
- src/app/layout/navbar/vertical/style-1/style-1.component.html
    - update logo-text to "TIMETRACKER"
    - comment-out user section
- src/@fuse/components/navigation/navigation.component.ts:
    - add to definitions:
        ```
        @Input()
        authorities: string;
        ```
    - add to constructor:
        ```text
        private authService: AuthService,
        private tokenService: TokenService,
        private tokenStorageService: TokenStorageService
        ```
    - add to ngOnInit:
        ```text
        if (this.tokenService.getToken()) {
            this.getAuthoritiesFromToken();
        } else {
            this.tokenStorageService.tokenObs.subscribe(token => {
                this.getAuthoritiesFromToken();
            });
        }
        ```
    - add to class:
        ```text
        private getAuthoritiesFromToken() {
            this.authService.getTokenInfo().subscribe(
                response => {
                    this.authorities = response.authorities;
                },
                error => {
                    // Do nothing
                }
            );
        }
        ```
- src/@fuse/components/navigation/vertical/collapsable/collapsable.component.html
    - replace where class="children":
        ```text
        <div class="children" [@slideInOut]="isOpen">
            <ng-container *ngFor="let item of item.children">
                <fuse-nav-vertical-item *ngIf="item.type=='item'"
                                        [item]="item"
                                        [authorities]="authorities">
                </fuse-nav-vertical-item>
                <fuse-nav-vertical-collapsable *ngIf="item.type=='collapsable'"
                                               [item]="item"
                                               [authorities]="authorities">
                </fuse-nav-vertical-collapsable>
                <fuse-nav-vertical-group *ngIf="item.type=='group'"
                                         [item]="item"
                                         [authorities]="authorities">
                </fuse-nav-vertical-group>
            </ng-container>
        </div>
        ```
- src/@fuse/components/navigation/vertical/collapsable/collapsable.component.ts
    - add to definitions: 
        ```text
        @Input()
        authorities: string;
        ```
    - add to constructor:
        ```text
        private tokenService: TokenService,
        private authService: AuthService
        ```
      
- src/@fuse/components/navigation/vertical/group/group.component.html
    - replace group-items with:
        ```text
        <div class="group-items">
            <ng-container *ngFor="let item of item.children">
                <fuse-nav-vertical-group *ngIf="item.type=='group'"
                                         [item]="item"
                                         [authorities]="authorities">
                </fuse-nav-vertical-group>
                <fuse-nav-vertical-collapsable *ngIf="item.type=='collapsable'"
                                               [authorities]="authorities"
                                               [item]="item">
                </fuse-nav-vertical-collapsable>
                <fuse-nav-vertical-item *ngIf="item.type=='item'"
                                        [item]="item"
                                        [authorities]="authorities">
                </fuse-nav-vertical-item>
            </ng-container>
        </div>
        ```
- src/@fuse/components/navigation/vertical/group/group.component.ts
    - add to definitions:
        ```text
        @Input()
        authorities: string;
        ```
    - add to constructor:
        ```text
        private tokenService: TokenService,
        private authService: AuthService
        ```
- src/@fuse/components/navigation/vertical/item/item.component.html
    - add ng-container
        ```text
        <ng-container *ngIf="tokenService.getToken() && authService.displayComponent(item, authorities)">
          stuff...
        </ng-container>
        ```
- src/@fuse/components/navigation/vertical/item/item.component.ts
    - add to definitions:
        ```
        @Input()
        authorities: string;
        ```
    - add to constructor: 
        ```text
        private tokenService: TokenService,
        private authService: AuthService
        ```
- src/@fuse/types/fuse-navigation.ts
    - add `role?: string; // TQP` to 
- src/app
    - copy custom folder to src/app folder
- src/app/app.module.ts: 
    - add Custom App Routes
    - add Default App Route
- src/app/app.component.html: 
    - comment-out THEME OPTIONS PANEL section
- src/app/layout/components/toolbar/toolbar.component.html:
    - include custom user menu items (My Profile and Logout)
    - comment-out fuse-shortcuts
    - replace: 
        ```text
        <span class="username mr-12" fxHide fxShow.gt-sm>Charlie Adams</span>
        with
        <span class="username mr-12" fxHide fxShow.gt-sm *ngIf="user">
            {{user.givenName}} {{user.surname}}
        </span>
        ```
      
    - comment-out unused menu items
- src/app/layout/components/toolbar/toolbar.component.ts: 
    - add custom methods (getMyUserProfile and logout)
    - add references to the constructor
    - add `public user: User;` to definitions  
    - add to ngOnInit:
        ```text
        // If a token is present, get the User's info.
        // For the cases where the page may load before the token has been obtained,
        // watch for changes to the token Observable. When we have a token, load the data.
        if(this.tokenService.getToken()) {
            this.getMyUserInfo();
        } else {
            this.tokenStorageService.tokenObs.subscribe(token => {
                this.getMyUserInfo();
            });
        }
        ```
- src/app/navigation/navigation.ts:
    - add custom navigation targets  
- src/environments
    - update environments with custom files for the PROD and DEV environments
- src/app/fuse-config/index.ts:
    - toolbar.customBackgroundColor: true
    - toolbar.background: 'fuse-white-900'
    - toolbar.position: 'below-fixed'
    - sidepanel.hidden: true