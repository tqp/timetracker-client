import {Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {AuthService} from '../../../services/auth.service';
import {FuseProgressBarService} from '../../../../../@fuse/components/progress-bar/progress-bar.service';
import {FuelStationService} from '../fuel-station.service';
import {FuelStation} from '../../../models/FuelStation';
import {FuelStationEditDialogComponent} from '../fuel-station-edit-dialog/fuel-station-edit-dialog.component';
import {FormGroup} from '@angular/forms';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {fuseAnimations} from '../../../../../@fuse/animations';
import {MatSort} from '@angular/material/sort';
import {FuseConfirmDialogComponent} from '../../../../../@fuse/components/confirm-dialog/confirm-dialog.component';
import {ActivatedRoute, Router} from '@angular/router';
import {FuelActivityService} from '../../fuel-activity/fuel-activity.service';

@Component({
    selector: 'app-fuel-station-list',
    templateUrl: './fuel-station-list.component.html',
    styleUrls: ['./fuel-station-list.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class FuelStationListComponent implements OnInit {
    @ViewChild('dialogContent') public dialogRef: any;
    @ViewChild(MatSort, {static: true}) sort: MatSort;

    public title = 'Fuel Station List';
    public fuelStationList: FuelStation[];
    public dataSource;
    public displayedColumns: string[] = [
        'stationName',
        'stationAffiliation',
        'stationCity',
        'stationState',
        'stationVisitCount',
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
        this.getFuelStationList();
    }

    private calculateTableHeight(): void {
        const pixelsAboveTable = 150;
        const pixelsBelowTable = 30;
        this.tableHeight = Math.round((window.innerHeight.valueOf() - pixelsAboveTable - pixelsBelowTable));
    }

    public createFuelStation(): void {
        this.dialogRef = this._matDialog.open(FuelStationEditDialogComponent, {
            panelClass: 'fuel-station-edit-dialog',
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
                const fuelStation: FuelStation = response.getRawValue().fuelStation;
                this.fuelStationService.createFuelStation(fuelStation).then((newFuelStation) => {
                    console.log('New Fuel Station Created', newFuelStation);
                    this.getFuelStationList();
                });
            });
    }

    private getFuelStationList(): void {
        this._fuseProgressBarService.show();
        this.fuelStationService.getFuelStationList().subscribe(
            (result: any) => {
                this.fuelStationList = result;
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

    public editFuelStation(stationGuid: string): void {
        this.dialogRef = this._matDialog.open(FuelStationEditDialogComponent, {
            panelClass: 'fuel-station-edit-dialog',
            data: {
                stationGuid: stationGuid,
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
                        this.fuelStationService.updateFuelStation(formData.getRawValue().fuelStation).then(() => {
                            this.getFuelStationList();
                        });
                        break;
                    case 'delete':
                        this.deleteFuelStation(stationGuid);
                        break;
                }
            });
    }

    deleteFuelStation(stationGuid: string): void {
        this.confirmDialogRef = this._matDialog.open(FuseConfirmDialogComponent, {
            disableClose: false
        });

        this.confirmDialogRef.componentInstance.confirmMessage = 'Are you sure you want to delete?';

        this.confirmDialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.fuelStationService.deleteFuelStation(stationGuid).then(() => {
                    this.getFuelStationList();
                });
            }
            this.confirmDialogRef = null;
        });
    }

    public openDetail(fuelStation: FuelStation): void {
        this.router.navigate(['/developer-pages/fuel-station-detail', fuelStation.stationGuid]).then();
    }
}
