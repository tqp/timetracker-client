import {Component, OnInit, ViewChild} from '@angular/core';
import {MatSort} from '@angular/material/sort';
import {Trip} from '../../charter-sauce-models/Trip';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {FuseConfirmDialogComponent} from '../../../../../../@fuse/components/confirm-dialog/confirm-dialog.component';
import {ActivatedRoute, Router} from '@angular/router';
import {FuseProgressBarService} from '../../../../../../@fuse/components/progress-bar/progress-bar.service';
import {FuelActivityService} from '../../../auto-tracker/fuel-activity/fuel-activity.service';
import {TripService} from '../../trip/trip.service';
import {AuthService} from '../../../../services/auth.service';
import {TripEditDialogComponent} from '../../trip/trip-edit-dialog/trip-edit-dialog.component';
import {FormGroup} from '@angular/forms';
import {MatTableDataSource} from '@angular/material/table';

@Component({
    selector: 'app-trip-list',
    templateUrl: './trip-list.component.html',
    styleUrls: ['./trip-list.component.scss']
})
export class TripListComponent implements OnInit {
    @ViewChild('dialogContent') public dialogRef: any;
    @ViewChild(MatSort, {static: true}) sort: MatSort;

    public title = 'Trip';
    public tripList: Trip[];
    public dataSource;
    public displayedColumns: string[] = [
        'tripName',
        'tripStartDate',
        'tripEndDate',
        'buttons'
    ];
    public tableHeight: number;
    public confirmDialogRef: MatDialogRef<FuseConfirmDialogComponent>;

    constructor(
        private activatedRoute: ActivatedRoute,
        private _fuseProgressBarService: FuseProgressBarService,
        private fuelActivityService: FuelActivityService,
        private tripService: TripService,
        public _matDialog: MatDialog,
        private authService: AuthService,
        private router: Router
    ) {
        this.calculateTableHeight();
    }

    ngOnInit(): void {
        this.getTripList();
    }

    private calculateTableHeight(): void {
        const pixelsAboveTable = 150;
        const pixelsBelowTable = 30;
        this.tableHeight = Math.round((window.innerHeight.valueOf() - pixelsAboveTable - pixelsBelowTable));
    }

    public createTrip(): void {
        this.dialogRef = this._matDialog.open(TripEditDialogComponent, {
            panelClass: 'trip-edit-dialog',
            data: {
                action: 'new'
            }
        });

        this.dialogRef.afterClosed()
            .subscribe((response: FormGroup) => {
                if (!response) {
                    return;
                }
                // console.log('response', response.getRawValue());
                const trip: Trip = response.getRawValue();
                this.tripService.createTrip(trip).then((newTrip) => {
                    // console.log('New Trip Created', newTrip);
                    this.getTripList();
                });
            });
    }

    private getTripList(): void {
        this._fuseProgressBarService.show();
        this.tripService.getTripList().subscribe(
            (result: any) => {
                this.tripList = result;
                this.dataSource = new MatTableDataSource(result);
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

    public editTrip(tripGuid: string): void {
        this.dialogRef = this._matDialog.open(TripEditDialogComponent, {
            panelClass: 'trip-edit-dialog',
            data: {
                tripGuid: tripGuid,
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
                        this.tripService.updateTrip(formData.getRawValue()).then(() => {
                            this.getTripList();
                        });
                        break;
                    case 'delete':
                        this.deleteTrip(tripGuid);
                        break;
                }
            });
    }

    deleteTrip(tripGuid: string): void {
        this.confirmDialogRef = this._matDialog.open(FuseConfirmDialogComponent, {
            disableClose: false
        });

        this.confirmDialogRef.componentInstance.confirmMessage = 'Are you sure you want to delete?';

        this.confirmDialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.tripService.deleteTrip(tripGuid).then(() => {
                    this.getTripList();
                });
            }
            this.confirmDialogRef = null;
        });
    }

    public openDetail(trip: Trip): void {
        this.router.navigate(['/developer-pages/trip-detail', trip.tripGuid]).then();
    }
}
