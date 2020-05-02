import {Component, OnDestroy, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {MatSort, MatSortable} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {fuseAnimations} from '../../../../@fuse/animations';
import {FuelActivityService} from '../fuel-activity/fuel-activity.service';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {FuseConfirmDialogComponent} from '../../../../@fuse/components/confirm-dialog/confirm-dialog.component';
import {FuelActivity} from '../../models/FuelActivity';
import {Subject} from 'rxjs';
import {FuelStationService} from '../fuel-station/fuel-station.service';
import {FuseProgressBarService} from '../../../../@fuse/components/progress-bar/progress-bar.service';
import {AuthService} from '../../services/auth.service';
import {FuelActivityEditDialogComponent} from '../fuel-activity/fuel-activity-edit-dialog/fuel-activity-edit-dialog.component';
import {FormGroup} from '@angular/forms';
import {FuelFill} from '../../models/FuelFill';
import {FuelStation} from '../../models/FuelStation';

export interface FuelActivityFlat {
    fillGuid?: string;
    fillDate?: string;
    stationGuid?: string;
    stationAffiliation?: string;
    stationLocation?: string;
    fillOdometer?: number;
    fillMilesTraveled?: number;
    fillGallons?: number;
    fillCostPerGallon?: number;
    fillTotalCost?: number;
    fillMilesPerGallonCar?: number;
    fillMilesPerGallonCalc?: number;
}

@Component({
    selector: 'app-fuel-activity-two',
    templateUrl: './fuel-activity-two.component.html',
    styleUrls: ['./fuel-activity-two.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class FuelActivityTwoComponent implements OnInit, OnDestroy {
    @ViewChild('dialogContent') public dialogRef: any;
    @ViewChild(MatSort, {static: true}) sort: MatSort;

    public title = 'Fuel Activity';
    public tableHeight: number;
    public displayedColumns: string[] = [
        'fillDate',
        'stationAffiliation',
        'stationLocation',
        'fillOdometer',
        'fillMilesTraveled',
        'fillGallons',
        'fillCostPerGallon',
        'fillTotalCost',
        'fillMilesPerGallon',
        'buttons'
    ];
    public dataSource = new MatTableDataSource();
    // public dataSource: MatTableDataSource<FuelActivity>;
    public confirmDialogRef: MatDialogRef<FuseConfirmDialogComponent>;
    private _unsubscribeAll: Subject<any>;

    constructor(
        private fuelActivityService: FuelActivityService,
        private fuelStationService: FuelStationService,
        public _matDialog: MatDialog,
        private _fuseProgressBarService: FuseProgressBarService,
        private authService: AuthService
    ) {
        this.calculateTableHeight();
        // Set the private defaults
        this._unsubscribeAll = new Subject();
    }

    ngOnInit(): void {
        this.getFuelActivityList();
        this.sort.sort({id: 'fillDate', start: 'desc'} as MatSortable);
        // this.sort.sortChange.subscribe((item) => {
        //     console.log('sortChange', item);
        // });
    }

    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

    private calculateTableHeight(): void {
        const pixelsAboveTable = 150;
        const pixelsBelowTable = 20;
        this.tableHeight = Math.round((window.innerHeight.valueOf() - pixelsAboveTable - pixelsBelowTable));
    }

    public createFuelActivityStation(): void {
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
                const fuelActivity: FuelFill = response.getRawValue().fuelActivity;
                const fuelStation: FuelStation = response.getRawValue().fuelStation;
                // If this is a new FuelStation...
                if (!fuelActivity.stationGuid) {
                    console.log('Creating New FuelStation...');
                    this.fuelStationService.createFuelStation(fuelStation).then((newFuelStation) => {
                        console.log('New Fuel FuelStation Created', newFuelStation);
                        fuelActivity.stationGuid = newFuelStation.stationGuid;
                        // Then, create the Activity
                        this.createFuelActivity(fuelActivity);
                    });
                } else {
                    console.log('stationGuid', fuelActivity.stationGuid);
                    this.createFuelActivity(fuelActivity);
                }
            });
    }

    private createFuelActivity(fuelActivity: FuelFill): void {
        console.log('stationGuid', fuelActivity.stationGuid);
        this.fuelActivityService.createFuelActivity(fuelActivity).then((newFuelActivity) => {
            console.log('New Fuel Activity Created', newFuelActivity);
            this.getFuelActivityList();
        });
    }

    private getFuelActivityList(): void {
        this._fuseProgressBarService.show();
        this.fuelActivityService.getFuelActivityList().subscribe(
            (result: any) => {
                const fuelActivityListFlat = result.map(item => {
                    const fuelActivityFlatObject: FuelActivityFlat = {};
                    fuelActivityFlatObject.fillDate = item.fuelFill.fillDate;
                    fuelActivityFlatObject.fillOdometer = item.fuelFill.fillOdometer;
                    fuelActivityFlatObject.stationAffiliation = item.fuelStation.stationAffiliation;
                    fuelActivityFlatObject.stationLocation = item.fuelStation.stationCity + ', ' + item.fuelStation.stationState;
                    fuelActivityFlatObject.fillMilesTraveled = item.fuelFill.fillMilesTraveled;
                    fuelActivityFlatObject.fillGallons = item.fuelFill.fillGallons;
                    fuelActivityFlatObject.fillCostPerGallon = item.fuelFill.fillCostPerGallon;
                    fuelActivityFlatObject.fillTotalCost = item.fuelFill.fillTotalCost;
                    fuelActivityFlatObject.fillMilesPerGallonCar = item.fuelFill.fillMilesPerGallon;
                    fuelActivityFlatObject.fillMilesPerGallonCalc = item.fuelFill.fillMilesTraveled / item.fuelFill.fillGallons;
                    return fuelActivityFlatObject;
                });
                this.dataSource = new MatTableDataSource(fuelActivityListFlat);
                this.dataSource.sort = this.sort;
                this._fuseProgressBarService.hide();
            },
            error => {
                console.error('Error: ' + error.message);
                this.authService.errorHandler(error);
                this._fuseProgressBarService.hide();
            }
        );
    }

    editFuelActivity(fuelActivity: FuelFill): void {
        console.log('fuelActivity', fuelActivity);
        this.dialogRef = this._matDialog.open(FuelActivityEditDialogComponent, {
            panelClass: 'fuel-activity-edit-dialog',
            data: {
                activityGuid: fuelActivity.fillGuid,
                action: 'edit'
            }
        });

        this.dialogRef.afterClosed()
            .subscribe(response => {
                if (!response) {
                    return;
                }
                console.log('response', response);
                const actionType: string = response[0];
                const formData: FormGroup = response[1];
                switch (actionType) {
                    case 'save':
                        console.log('updateFuelActivity', formData.getRawValue().fuelActivity);
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

    deleteFuelActivity(fuelActivity: FuelFill): void {
        // this.confirmDialogRef = this._matDialog.open(FuseConfirmDialogComponent, {
        //     disableClose: false
        // });
        //
        // this.confirmDialogRef.componentInstance.confirmMessage = 'Are you sure you want to delete?';
        //
        // this.confirmDialogRef.afterClosed().subscribe(result => {
        //     if (result) {
        //         this.fuelActivityService.deleteFuelActivity(fuelActivity).then(() => {
        //             this.getFuelActivityStationList();
        //         });
        //     }
        //     this.confirmDialogRef = null;
        // });

    }


}
