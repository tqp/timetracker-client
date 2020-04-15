import {Component, OnDestroy, OnInit, TemplateRef, ViewChild, ViewEncapsulation} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {AuthService} from '../../../services/auth.service';
import {FuseProgressBarService} from '../../../../../@fuse/components/progress-bar/progress-bar.service';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {FuelActivity} from '../../../models/FuelActivity';
import {FuelActivityService} from '../fuel-activity.service';
import {FormGroup} from '@angular/forms';
import {FuelActivityEditDialogComponent} from '../fuel-activity-edit-dialog/fuel-activity-edit-dialog.component';
import {FuseConfirmDialogComponent} from '../../../../../@fuse/components/confirm-dialog/confirm-dialog.component';
import {Subject} from 'rxjs';
import {ContactsService} from '../../../../main/apps/contacts/contacts.service';
import {fuseAnimations} from '../../../../../@fuse/animations';

@Component({
    selector: 'app-fuel-activity-list',
    templateUrl: './fuel-activity-list.component.html',
    styleUrls: ['./fuel-activity-list.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class FuelActivityListComponent implements OnInit, OnDestroy {
    @ViewChild('dialogContent')
    dialogContent: TemplateRef<any>;

    public title = 'Fuel Activity';

    contacts: any;
    user: any;
    dataSource: MatTableDataSource<FuelActivity>;
    displayedColumns = [
        'fuelActivityDate',
        'fuelActivityOdometer',
        'fuelActivityTripMeter',
        'fuelActivityGallons',
        'fuelActivityPricePerGallon',
        'fuelActivityTotalCost',
        'fuelActivityMilesPerGallonCar',
        'fuelActivityMilesPerGallonCalc',
        'buttons'
    ];
    dialogRef: any;
    confirmDialogRef: MatDialogRef<FuseConfirmDialogComponent>;

    // Private
    private _unsubscribeAll: Subject<any>;

    constructor(
        private _contactsService: ContactsService,
        private fuelActivityService: FuelActivityService,
        public _matDialog: MatDialog,
        private _fuseProgressBarService: FuseProgressBarService,
        private authService: AuthService
    ) {
        // Set the private defaults
        this._unsubscribeAll = new Subject();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    ngOnInit(): void {
        this.getFuelActivityList();
    }

    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

    public createFuelActivity(): void {
        console.log('1');
        this.dialogRef = this._matDialog.open(FuelActivityEditDialogComponent, {
            panelClass: 'fuel-activity-edit-dialog',
            data: {
                action: 'new'
            }
        });

        this.dialogRef.afterClosed()
            .subscribe((response: FormGroup) => {
                if (!response) {
                    return;
                }
                this.fuelActivityService.createFuelActivity(response.getRawValue()).then(m => {
                    this.getFuelActivityList();
                });
            });
    }

    private getFuelActivityList(): void {
        this._fuseProgressBarService.show();
        this.fuelActivityService.getFuelActivityList().subscribe(
            result => {
                console.log('result', result);
                const fuelActivityList: FuelActivity[] = result;
                this.dataSource = new MatTableDataSource([...fuelActivityList].sort((a, b) => (a.fuelActivityDate > b.fuelActivityDate) ? 1 : -1));
                this._fuseProgressBarService.hide();
            },
            error => {
                console.error('Error: ' + error.message);
                this.authService.errorHandler(error);
                this._fuseProgressBarService.hide();
            }
        );
    }

    editFuelActivity(fuelActivity): void {
        this.dialogRef = this._matDialog.open(FuelActivityEditDialogComponent, {
            panelClass: 'fuel-activity-edit-dialog',
            data: {
                fuelActivity: fuelActivity,
                action: 'edit'
            }
        });

        this.dialogRef.afterClosed()
            .subscribe(response => {
                if (!response) {
                    return;
                }
                const actionType: string = response[0];
                const formData: FormGroup = response[1];
                switch (actionType) {
                    case 'save':
                        this.fuelActivityService.updateFuelActivity(formData.getRawValue()).then(() => {
                            this.getFuelActivityList();
                        });
                        break;
                    case 'delete':
                        this.deleteFuelActivity(fuelActivity);
                        break;
                }
            });
    }

    deleteFuelActivity(fuelActivity): void {
        this.confirmDialogRef = this._matDialog.open(FuseConfirmDialogComponent, {
            disableClose: false
        });

        this.confirmDialogRef.componentInstance.confirmMessage = 'Are you sure you want to delete?';

        this.confirmDialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.fuelActivityService.deleteFuelActivity(fuelActivity).then(() => {
                    this.getFuelActivityList();
                });
            }
            this.confirmDialogRef = null;
        });

    }
}
