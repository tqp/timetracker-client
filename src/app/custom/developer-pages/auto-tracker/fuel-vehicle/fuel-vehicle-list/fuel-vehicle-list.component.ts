import {Component, OnInit, ViewChild} from '@angular/core';
import {MatSort} from '@angular/material/sort';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {FuseConfirmDialogComponent} from '../../../../../../@fuse/components/confirm-dialog/confirm-dialog.component';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthService} from '../../../../services/auth.service';
import {FuseProgressBarService} from '../../../../../../@fuse/components/progress-bar/progress-bar.service';
import {FormGroup} from '@angular/forms';
import {MatTableDataSource} from '@angular/material/table';
import {FuelVehicle} from '../../auto-tracker-models/FuelVehicle';
import {FuelVehicleService} from '../fuel-vehicle.service';
import {FuelVehicleEditDialogComponent} from '../fuel-vehicle-edit-dialog/fuel-vehicle-edit-dialog.component';

@Component({
    selector: 'app-fuel-vehicle-list',
    templateUrl: './fuel-vehicle-list.component.html',
    styleUrls: ['./fuel-vehicle-list.component.scss']
})
export class FuelVehicleListComponent implements OnInit {
    @ViewChild('dialogContent') public dialogRef: any;
    @ViewChild(MatSort, {static: true}) sort: MatSort;

    public title = 'Vehicles';
    public fuelVehicleList: FuelVehicle[];
    public dataSource;
    public displayedColumns: string[] = [
        'vehicleName',
        'vehicleYear',
        'vehicleMake',
        'vehicleModel',
        'vehicleVin',
        'buttons'
    ];
    public tableHeight: number;
    public confirmDialogRef: MatDialogRef<FuseConfirmDialogComponent>;

    constructor(
        private activatedRoute: ActivatedRoute,
        private _fuseProgressBarService: FuseProgressBarService,
        private fuelVehicleService: FuelVehicleService,
        public _matDialog: MatDialog,
        private authService: AuthService,
        private router: Router
    ) {
        this.calculateTableHeight();
    }

    ngOnInit(): void {
        this.getFuelVehicleList();
    }

    private calculateTableHeight(): void {
        const pixelsAboveTable = 150;
        const pixelsBelowTable = 30;
        this.tableHeight = Math.round((window.innerHeight.valueOf() - pixelsAboveTable - pixelsBelowTable));
    }

    public createFuelVehicle(): void {
        this.dialogRef = this._matDialog.open(FuelVehicleEditDialogComponent, {
            panelClass: 'fuel-vehicle-edit-dialog',
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
                const fuelVehicle: FuelVehicle = response.getRawValue();
                this.fuelVehicleService.createFuelVehicle(fuelVehicle).then((newFuelVehicle) => {
                    console.log('New Vehicle Created', newFuelVehicle);
                    this.getFuelVehicleList();
                });
            });
    }

    private getFuelVehicleList(): void {
        this._fuseProgressBarService.show();
        this.fuelVehicleService.getFuelVehicleList().subscribe(
            (result: any) => {
                this.fuelVehicleList = result;
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

    public editFuelVehicle(vehicleGuid: string): void {
        console.log('vehicleGuid', vehicleGuid);
        this.dialogRef = this._matDialog.open(FuelVehicleEditDialogComponent, {
            panelClass: 'fuel-vehicle-edit-dialog',
            data: {
                vehicleGuid: vehicleGuid,
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
                        console.log('formData', formData.getRawValue());
                        this.fuelVehicleService.updateFuelVehicle(formData.getRawValue()).then(() => {
                            this.getFuelVehicleList();
                        });
                        break;
                    case 'delete':
                        this.deleteFuelVehicle(vehicleGuid);
                        break;
                }
            });
    }

    deleteFuelVehicle(vehicleGuid: string): void {
        this.confirmDialogRef = this._matDialog.open(FuseConfirmDialogComponent, {
            disableClose: false
        });

        this.confirmDialogRef.componentInstance.confirmMessage = 'Are you sure you want to delete?';

        this.confirmDialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.fuelVehicleService.deleteFuelVehicle(vehicleGuid).then(() => {
                    this.getFuelVehicleList();
                });
            }
            this.confirmDialogRef = null;
        });
    }

    public openDetail(fuelVehicle: FuelVehicle): void {
        this.router.navigate(['/developer-pages/fuel-vehicle-detail', fuelVehicle.vehicleGuid]).then();
    }
}
