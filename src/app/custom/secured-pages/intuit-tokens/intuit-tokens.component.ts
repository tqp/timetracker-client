import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {fuseAnimations} from '../../../../@fuse/animations';

@Component({
    selector: 'app-intuit-tokens',
    templateUrl: './intuit-tokens.component.html',
    styleUrls: ['./intuit-tokens.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class IntuitTokensComponent implements OnInit {
    title = 'Intuit Tokens';

    constructor(private _activatedRoute: ActivatedRoute) {
    }

    /**
     * On init
     */
    ngOnInit(): void {
    }

}
