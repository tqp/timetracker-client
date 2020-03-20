import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {fuseAnimations} from '../../../../@fuse/animations';
import {UserProfileService} from '../../services/user-profile.service';
import {User} from '../../models/User';
import {AuthService} from '../../services/auth.service';

@Component({
    selector: 'app-my-profile',
    templateUrl: './my-profile.component.html',
    styleUrls: ['./my-profile.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class MyProfileComponent implements OnInit {
    public user: User;

    constructor(protected userProfileService: UserProfileService,
                protected authService: AuthService
    ) {
    }

    ngOnInit(): void {
        this.getMyUserInfo();
    }

    private getMyUserInfo(): any {
        this.userProfileService.getMyUserInfo().subscribe(
            response => {
                this.user = response;
            },
            error => {
                console.error('Error: ', error);
                this.authService.errorHandler(error);
            }
        );
    }
}
