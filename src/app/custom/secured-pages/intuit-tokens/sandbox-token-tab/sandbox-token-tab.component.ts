import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {fuseAnimations} from '../../../../../@fuse/animations';

@Component({
    selector: 'app-sandbox-token-tab',
    templateUrl: './sandbox-token-tab.component.html',
    styleUrls: ['./sandbox-token-tab.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class SandboxTokenTabComponent implements OnInit {

    constructor() {
    }

    ngOnInit(): void {
    }

}
