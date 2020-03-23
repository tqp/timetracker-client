import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {TokenExchangeService} from '../../services/token-exchange.service';
import {TokenStorageService} from '../../services/token-storage.service';

@Component({
    selector: 'app-token-exchange',
    templateUrl: './token-exchange.component.html',
    styleUrls: ['./token-exchange.component.scss']
})
export class TokenExchangeComponent implements OnInit {

    constructor(protected route: ActivatedRoute,
                protected tokenExchangeService: TokenExchangeService,
                protected tokenStorageService: TokenStorageService,
                protected router: Router) {
    }

    ngOnInit(): void {
        this.route.queryParams.subscribe((params) => {
            const shortLivedToken = params['slt'];
            // console.log('TokenExchangeComponent -> ngOnInit: shortLivedToken=[' + this.tokenExchangeService.shortId(shortLivedToken) + ']');
            this.exchangeTokens(shortLivedToken);
        });
    }

    private exchangeTokens(shortLivedToken: string): void {
        // console.log('TokenExchangeComponent -> exchangeTokens: shortLivedToken=[' + this.tokenExchangeService.shortId(shortLivedToken) + ']');
        this.tokenExchangeService.exchangeToken(shortLivedToken).subscribe(
            data => {
                // console.log('TokenExchangeComponent -> exchangeTokens:');
                // console.dir(data);
                this.tokenStorageService.saveJwtToken(data.value);
                this.router.navigate(['/home']).then(() => {
                    console.log('The token exchange process is re-routing you...');
                });
            },
            error => {
                console.dir(error);
                console.error('Error: ' + error.error.error);
                console.error('Error Description: ' + error.error.error_description);
            }
        );
    }

}
