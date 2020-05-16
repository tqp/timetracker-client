import {Component, OnInit, ViewChild} from '@angular/core';
import {MatSort} from '@angular/material/sort';
import {FuelActivity} from '../../auto-tracker-models/FuelActivity';
import {FuelVehicle} from '../../auto-tracker-models/FuelVehicle';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {FuseConfirmDialogComponent} from '../../../../../../@fuse/components/confirm-dialog/confirm-dialog.component';
import {ActivatedRoute, Router} from '@angular/router';
import {FuelVehicleService} from '../fuel-vehicle.service';
import {FuelActivityService} from '../../fuel-activity/fuel-activity.service';
import {AuthService} from '../../../../services/auth.service';
import {FuseProgressBarService} from '../../../../../../@fuse/components/progress-bar/progress-bar.service';
import {FuelVehicleEditDialogComponent} from '../fuel-vehicle-edit-dialog/fuel-vehicle-edit-dialog.component';
import {FormGroup} from '@angular/forms';
import {FuelActivityFlat} from '../../auto-tracker-models/FuelActivityFlat';

@Component({
    selector: 'app-fuel-vehicle-detail',
    templateUrl: './fuel-vehicle-detail.component.html',
    styleUrls: ['./fuel-vehicle-detail.component.scss']
})
export class FuelVehicleDetailComponent implements OnInit {
    @ViewChild(MatSort, {static: true}) sort: MatSort;
    public vehicleGuid: string;
    public fuelVehicle: FuelVehicle;
    public dialogRef: any;
    public confirmDialogRef: MatDialogRef<FuseConfirmDialogComponent>;
    public dataSource;

    constructor(private route: ActivatedRoute,
                private router: Router,
                private fuelVehicleService: FuelVehicleService,
                private fuelActivityService: FuelActivityService,
                private authService: AuthService,
                private _fuseProgressBarService: FuseProgressBarService,
                public _matDialog: MatDialog) {
    }

    ngOnInit(): void {
        this.vehicleGuid = this.route.snapshot.paramMap.get('guid');
        this.getFuelVehicle(this.vehicleGuid);
    }

    private getFuelVehicle(vehicleGuid: string): void {
        this._fuseProgressBarService.show();
        this.fuelVehicleService.getFuelVehicle(vehicleGuid).subscribe(
            result => {
                this.fuelVehicle = result;
                this._fuseProgressBarService.hide();
            },
            error => {
                console.error('Error: ' + error.message);
                this._fuseProgressBarService.hide();
            }
        );
    }

    public editFuelVehicle(vehicleGuid: string): void {
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
                        this.fuelVehicleService.updateFuelVehicle(formData.getRawValue()).then(() => {
                            this.getFuelVehicle(formData.getRawValue().vehicleGuid);
                        });
                        break;
                    case 'delete':
                        console.log('delete');
                        // this.deleteContact(contact);
                        break;
                }
            });
    }

    public deleteFuelVehicle(vehicleGuid: string): void {
        this.confirmDialogRef = this._matDialog.open(FuseConfirmDialogComponent, {
            disableClose: false
        });

        this.confirmDialogRef.componentInstance.confirmMessage = 'Are you sure you want to delete?';

        this.confirmDialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.fuelVehicleService.deleteFuelVehicle(vehicleGuid).then(() => {
                    this.router.navigate(['developer-pages/fuel-vehicle-list']).then();
                });
            }
            this.confirmDialogRef = null;
        });
    }

    public openDetail(fuelActivityFlat: FuelActivityFlat): void {
        console.log('openDetail', fuelActivityFlat.fillGuid);
        this.router.navigate(['/developer-pages/fuel-activity-detail', fuelActivityFlat.fillGuid]).then();
    }
}
