import {Component, OnInit} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {AuthService} from '../../services/auth.service';
import {FuseProgressBarService} from '../../../../@fuse/components/progress-bar/progress-bar.service';
import {FuelStationListService} from './fuel-station-list.service';
import {FuelStation} from '../../models/FuelStation';
import {FuelStationEditDialogComponent} from '../fuel-station-edit-dialog/fuel-station-edit-dialog.component';
import {FormGroup} from '@angular/forms';
import {FuelStationDetailService} from '../fuel-station-detail/fuel-station-detail.service';
import {MatDialog} from '@angular/material/dialog';

@Component({
    selector: 'app-fuel-station-list',
    templateUrl: './fuel-station-list.component.html',
    styleUrls: ['./fuel-station-list.component.scss']
})
export class FuelStationListComponent implements OnInit {
    public title = 'Fuel Station List';
    public displayedColumns: string[] = ['stationName', 'stationCity', 'stationState'];
    public dataSource: MatTableDataSource<FuelStation>;
    public tableHeight: number;
    public dialogRef: any;

    constructor(private fuelStationListService: FuelStationListService,
                private authService: AuthService,
                private fuelStationDetailService: FuelStationDetailService,
                private _fuseProgressBarService: FuseProgressBarService,
                public _matDialog: MatDialog) {
    }

    ngOnInit(): void {
        this.calculateTableHeight();
        this.getFuelStationList();
    }

    private calculateTableHeight(): void {
        const pixelsAboveTable = 150;
        const pixelsBelowTable = 50;
        this.tableHeight = Math.round((window.innerHeight.valueOf() - pixelsAboveTable - pixelsBelowTable));
    }

    private getFuelStationList(): void {
        this._fuseProgressBarService.show();
        this.fuelStationListService.getFuelStationList().subscribe(
            result => {
                console.log('result', result);
                const fuelStationList: FuelStation[] = result;
                this.dataSource = new MatTableDataSource([...fuelStationList].sort((a, b) => (a.stationName > b.stationName) ? 1 : -1));
                this._fuseProgressBarService.hide();
            },
            error => {
                console.error('Error: ' + error.message);
                this.authService.errorHandler(error);
                this._fuseProgressBarService.hide();
            }
        );
    }

    public createFuelStation(): void {
        this.dialogRef = this._matDialog.open(FuelStationEditDialogComponent, {
            panelClass: 'contact-form-dialog',
            data: {
                action: 'new'
            }
        });

        this.dialogRef.afterClosed()
            .subscribe((response: FormGroup) => {
                if (!response) {
                    return;
                }
                this.fuelStationDetailService.createFuelStation(response.getRawValue()).then(m => {
                    this.getFuelStationList();
                });
            });
    }

}
