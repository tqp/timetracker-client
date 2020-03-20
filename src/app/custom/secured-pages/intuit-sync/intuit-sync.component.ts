import {Component, OnInit} from '@angular/core';
import {fuseAnimations} from '@fuse/animations';
import {IntuitSyncService} from './intuit-sync.service';
import * as moment from 'moment';

@Component({
    selector: 'app-intuit-sync',
    templateUrl: './intuit-sync.component.html',
    styleUrls: ['./intuit-sync.component.scss'],
    animations: fuseAnimations
})
export class IntuitSyncComponent implements OnInit {
    public title = 'Synchronize Data with Intuit';
    public employeeSyncInProgress = false;
    public userListSyncInProgress = false;
    public timeActivitySyncInProgressChanges = false;
    public timeActivitySyncInProgressChangesCompare = false;
    public timeActivitySyncInProgressMonth = false;
    public timeActivitySyncInProgressFull = false;

    public lastEmployeeSyncTimestamp: string;
    public lastUserListSyncTimestamp: string;
    public lastTimeActivitySyncTimestamp: string;

    constructor(protected intuitSyncService: IntuitSyncService) {
    }

    ngOnInit(): void {
        this.getLastEmployeeSyncTimestamp();
        this.getLastUserListSyncTimestamp();
        this.getLastTimeActivitySyncTimestamp();
    }


    public getLastEmployeeSyncTimestamp(): void {
        this.intuitSyncService.getLastEmployeeSyncTimestamp().subscribe(
            result => {
                if (result) {
                    // console.log('Results: ', result);
                    const utcDate = moment.utc(result.timestamp).toDate();
                    // this.lastEmployeeSyncTimestamp = moment.utc(result.timestamp).local().format('MM/DD/YYYY h:mm:ss A').toString();
                    this.lastEmployeeSyncTimestamp = moment(utcDate).local().format('MM/DD/YYYY h:mm:ss A');
                } else {
                    this.lastUserListSyncTimestamp = 'Never Synced';
                }
            },
            error => {
                console.error('Error: ', error);
            },
            () => {
                this.employeeSyncInProgress = false;
            }
        );
    }

    public getLastUserListSyncTimestamp(): void {
        this.intuitSyncService.getLastUserListSyncTimestamp().subscribe(
            result => {
                console.log('Results: ', result);
                if (result) {
                    const utcDate = moment.utc(result.timestamp).toDate();
                    // this.lastEmployeeSyncTimestamp = moment.utc(result.timestamp).local().format('MM/DD/YYYY h:mm:ss A').toString();
                    this.lastUserListSyncTimestamp = moment(utcDate).local().format('MM/DD/YYYY h:mm:ss A');
                } else {
                    this.lastUserListSyncTimestamp = 'Never Synced';
                }
            },
            error => {
                console.error('Error: ', error);
            },
            () => {
                this.employeeSyncInProgress = false;
            }
        );
    }

    public getLastTimeActivitySyncTimestamp(): void {
        this.intuitSyncService.getLastTimeActivitySyncTimestamp().subscribe(
            result => {
                if (result) {
                    // console.log('Results: ', result);
                    const utcDate = moment.utc(result.timestamp).toDate();
                    // console.log('utcDate: ', utcDate);
                    // this.lastTimeActivitySyncTimestamp = moment.utc(result.timestamp).local().format('MM/DD/YYYY h:mm:ss A').toString();
                    this.lastTimeActivitySyncTimestamp = moment(utcDate).local().format('MM/DD/YYYY h:mm:ss A');
                } else {
                    this.lastTimeActivitySyncTimestamp = 'Never Synced';
                }
            },
            error => {
                console.error('Error: ', error);
            },
            () => {
                this.userListSyncInProgress = false;
            }
        );
    }

    public syncEmployeeList(): void {
        this.employeeSyncInProgress = true;
        this.intuitSyncService.syncEmployeeList().subscribe(
            result => {
                console.log('Number of Records Updated: ', result);
            },
            error => {
                console.error('Error: ', error);
            },
            () => {
                this.employeeSyncInProgress = false;
                this.getLastEmployeeSyncTimestamp();
            }
        );
    }

    public syncUserListWithEmployeeList(): void {
        this.userListSyncInProgress = true;
        this.intuitSyncService.syncUserListWithEmployeeList().subscribe(
            result => {
                console.log('Number of Records Updated: ', result);
            },
            error => {
                console.error('Error: ', error);
            },
            () => {
                this.userListSyncInProgress = false;
                this.getLastUserListSyncTimestamp();
            }
        );
    }

    public compareTimeActivitySinceLastSync(): void {
        this.timeActivitySyncInProgressChangesCompare = true;
        this.intuitSyncService.compareTimeActivitySinceLastSync().subscribe(
            result => {
                console.log('Number of Records Updated: ', result);
            },
            error => {
                console.error('Error: ', error);
            },
            () => {
                this.timeActivitySyncInProgressChangesCompare = false;
                this.getLastTimeActivitySyncTimestamp();
            }
        );
    }

    public syncTimeActivitySinceLastSync(): void {
        this.timeActivitySyncInProgressChanges = true;
        this.intuitSyncService.syncTimeActivitySinceLastSync().subscribe(
            result => {
                console.log('Number of Records Updated: ', result);
            },
            error => {
                console.error('Error: ', error);
            },
            () => {
                this.timeActivitySyncInProgressChanges = false;
                this.getLastTimeActivitySyncTimestamp();
            }
        );
    }

    public syncTimeActivityMonth(): void {
        this.timeActivitySyncInProgressMonth = true;
        this.intuitSyncService.syncTimeActivityMonth().subscribe(
            result => {
                console.log('Number of Records Updated: ', result);
            },
            error => {
                console.error('Error: ', error);
            },
            () => {
                this.timeActivitySyncInProgressMonth = false;
                this.getLastTimeActivitySyncTimestamp();
            }
        );
    }

    public syncTimeActivityFull(): void {
        this.timeActivitySyncInProgressFull = true;
        this.intuitSyncService.syncTimeActivityFull().subscribe(
            result => {
                console.log('Number of Records Updated: ', result);
            },
            error => {
                console.error('Error: ', error);
            },
            () => {
                this.timeActivitySyncInProgressFull = false;
                this.getLastTimeActivitySyncTimestamp();
            }
        );
    }
}
