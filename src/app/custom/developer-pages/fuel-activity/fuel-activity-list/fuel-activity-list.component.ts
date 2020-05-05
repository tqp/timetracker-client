import {AfterViewInit, Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {AuthService} from '../../../services/auth.service';
import {FuseProgressBarService} from '../../../../../@fuse/components/progress-bar/progress-bar.service';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {FuelFill} from '../../../models/FuelFill';
import {FuelActivityService} from '../fuel-activity.service';
import {FormGroup} from '@angular/forms';
import {FuelActivityEditDialogComponent} from '../fuel-activity-edit-dialog/fuel-activity-edit-dialog.component';
import {FuseConfirmDialogComponent} from '../../../../../@fuse/components/confirm-dialog/confirm-dialog.component';
import {fuseAnimations} from '../../../../../@fuse/animations';
import {FuelStationService} from '../../fuel-station/fuel-station.service';
import {FuelStation} from '../../../models/FuelStation';
import {MatSort} from '@angular/material/sort';
import {ActivatedRoute, Router} from '@angular/router';
import {FuelActivityFlat} from '../../../models/FuelActivityFlat';

@Component({
    selector: 'app-fuel-activity-list',
    templateUrl: './fuel-activity-list.component.html',
    styleUrls: ['./fuel-activity-list.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class FuelActivityListComponent implements OnInit, AfterViewInit {
    @ViewChild('dialogContent') public dialogRef: any;
    @ViewChild(MatSort, {static: true}) sort: MatSort;

    public title = 'Fuel Activity';
    public fuelActivityListFlat: FuelActivityFlat[];
    public dataSource;
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
    public tableHeight: number;
    public confirmDialogRef: MatDialogRef<FuseConfirmDialogComponent>;

    constructor(
        private activatedRoute: ActivatedRoute,
        private _fuseProgressBarService: FuseProgressBarService,
        private fuelActivityService: FuelActivityService,
        private fuelStationService: FuelStationService,
        public _matDialog: MatDialog,
        private authService: AuthService,
        private router: Router
    ) {
        this.calculateTableHeight();
    }

    ngOnInit(): void {
        // const fuelActivity: FuelActivity = this.activatedRoute.snapshot.data.fuelActivity;
        // const flat: any = this.fuelActivityService.flattenFuelActivityObject(fuelActivity);
        // this.fuelActivityListFlat = flat;
        // console.log('flat', flat);
        // this.dataSource = new MatTableDataSource(flat);

        this.getFuelActivityList();
        // const flat: any = this.fuelActivityService.flattenFuelActivityObject(this.fuelActivity);
    }

    public ngAfterViewInit(): void {
        // this.dataSource.sort = this.sort;
    }

    private calculateTableHeight(): void {
        const pixelsAboveTable = 150;
        const pixelsBelowTable = 30;
        this.tableHeight = Math.round((window.innerHeight.valueOf() - pixelsAboveTable - pixelsBelowTable));
    }

    public createFuelActivity(): void {
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
                console.log('response', response.getRawValue());

                const fuelFill: FuelFill = response.getRawValue().fuelFill;
                const fuelStation: FuelStation = response.getRawValue().fuelStation;

                console.log('fuelFill', fuelFill);

                // If this is a new FuelStation...
                if (!fuelFill.stationGuid) {
                    console.log('Creating New FuelStation...');
                    this.fuelStationService.createFuelStation(fuelStation).then((newFuelStation) => {
                        console.log('New Fuel FuelStation Created', newFuelStation);
                        fuelFill.stationGuid = newFuelStation.stationGuid;
                        // Then, create the Activity
                        this.createFuelFill(fuelFill);
                    });
                } else {
                    console.log('stationGuid', fuelFill.stationGuid);
                    this.createFuelFill(fuelFill);
                }
            });
    }

    private createFuelFill(fuelFill: FuelFill): void {
        console.log('stationGuid', fuelFill.stationGuid);
        this.fuelActivityService.createFuelActivity(fuelFill).then((newFuelActivity) => {
            console.log('New Fuel Activity Created', newFuelActivity);
            this.getFuelActivityList();
        });
    }

    private getFuelActivityList(): void {
        this._fuseProgressBarService.show();
        this.fuelActivityService.getFuelActivityList().subscribe(
            (result: any) => {
                if (!result) {
                    return;
                }
                const flat: any = this.fuelActivityService.flattenFuelActivityObject(result);
                this.fuelActivityListFlat = flat;
                this.dataSource = new MatTableDataSource<FuelActivityFlat>(flat);
                this.dataSource.sort = this.sort;
            },
            error => {
                console.error('Error: ' + error.message);
                this.authService.errorHandler(error);
                this._fuseProgressBarService.hide();
            },
            () => {

                this._fuseProgressBarService.hide();
            }
        );
    }

    public editFuelActivity(fillGuid: string): void {
        this.dialogRef = this._matDialog.open(FuelActivityEditDialogComponent, {
            panelClass: 'fuel-activity-edit-dialog',
            data: {
                fillGuid: fillGuid,
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
                        this.fuelActivityService.updateFuelActivity(formData.getRawValue().fuelFill).then(() => {
                            this.getFuelActivityList();
                        });
                        break;
                    case 'delete':
                        this.deleteFuelActivity(fillGuid);
                        break;
                }
            });
    }

    deleteFuelActivity(fillGuid: string): void {
        this.confirmDialogRef = this._matDialog.open(FuseConfirmDialogComponent, {
            disableClose: false
        });

        this.confirmDialogRef.componentInstance.confirmMessage = 'Are you sure you want to delete?';

        this.confirmDialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.fuelActivityService.deleteFuelActivity(fillGuid).then(() => {
                    this.getFuelActivityList();
                });
            }
            this.confirmDialogRef = null;
        });
    }

    public openDetail(fuelActivityFlat: FuelActivityFlat): void {
        console.log('openDetail', fuelActivityFlat.fillGuid);
        this.router.navigate(['/developer-pages/fuel-activity-detail', fuelActivityFlat.fillGuid]).then();
    }

    public getMilesPerGallonColor(car: number, calc: number): string {
        const abs = Math.abs(car - calc);
        if (abs > 4) {
            return 'red';
        } else if (abs > 2) {
            return 'orange';
        } else {
            return 'green';
        }
    }

    public getTotalCostColor(fillGallons: number, fillCostPerGallon: number, fillTotalCost: number): string {
        if (Math.round(fillCostPerGallon * fillGallons) === Math.round(fillTotalCost)) {
            return 'green';
        } else {
            return 'red';
        }
    }
}
