import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {fuseAnimations} from '../../../../../@fuse/animations';
import * as moment from 'moment';
import {AuthService} from '../../../services/auth.service';
import {IntuitAuthService} from '../../../services/intuit-auth.service';
import {IntuitToken} from '../../../models/IntuitToken';

@Component({
    selector: 'app-production-token-tab',
    templateUrl: './production-token-tab.component.html',
    styleUrls: ['./production-token-tab.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class ProductionTokenTabComponent implements OnInit {
    public clientId: string;
    public redirectUri: string;
    public intuitToken: IntuitToken;

    constructor(protected authService: AuthService,
                protected intuitAuthService: IntuitAuthService) {
    }

    ngOnInit(): void {
        this.getIntuitProductionTokenConfig();
        this.getIntuitProductionTokenInfo();
    }

    private getIntuitProductionTokenConfig(): any {
        this.intuitAuthService.getIntuitProductionTokenConfig().subscribe(
            response => {
                // console.log('response', response);
                this.clientId = response.clientId;
                this.redirectUri = response.redirectUri;
            },
            error => {
                console.error('Error: ', error);
                this.authService.errorHandler(error);
            }
        );
    }

    private getIntuitProductionTokenInfo(): any {
        this.intuitAuthService.getIntuitProductionTokenInfo().subscribe(
            response => {
                // console.log('response', response);
                this.intuitToken = response;
                this.intuitToken.tokenIssuedDisplay = moment.utc(this.intuitToken.tokenIssued).local().format('YYYY-MM-DD HH:mm:ss.SSS').toString();
            },
            error => {
                console.error('Error: ', error);
                this.authService.errorHandler(error);
            }
        );
    }


    public refreshAccessToken(): void {
        this.intuitAuthService.refreshProductionAccessToken().subscribe(
            result => {
                // console.log('result', result);
                this.getIntuitProductionTokenInfo();
            },
            error => {
                console.error('Error: ', error);
            }
        );
    }

}
