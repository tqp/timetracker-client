import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FuelStation} from '../../../models/FuelStation';
import {AuthService} from '../../../services/auth.service';
import {FuseProgressBarService} from '../../../../../@fuse/components/progress-bar/progress-bar.service';
import {FormGroup} from '@angular/forms';
import {FuseConfirmDialogComponent} from '../../../../../@fuse/components/confirm-dialog/confirm-dialog.component';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {FuelStationEditDialogComponent} from '../fuel-station-edit-dialog/fuel-station-edit-dialog.component';
import {FuelStationService} from '../fuel-station.service';

@Component({
    selector: 'app-fuel-station-detail',
    templateUrl: './fuel-station-detail.component.html',
    styleUrls: ['./fuel-station-detail.component.scss']
})
export class FuelStationDetailComponent implements OnInit {
    public title = 'Fuel FuelStation Detail';
    public guid: string;
    public fuelStation: FuelStation;

    public dialogRef: any;
    public confirmDialogRef: MatDialogRef<FuseConfirmDialogComponent>;

    constructor(private route: ActivatedRoute,
                private router: Router,
                private fuelStationService: FuelStationService,
                private authService: AuthService,
                private _fuseProgressBarService: FuseProgressBarService,
                public _matDialog: MatDialog) {
    }

    ngOnInit(): void {
        this.guid = this.route.snapshot.paramMap.get('guid');
        this.getFuelStation(this.guid);
    }

    private getFuelStation(stationGuid: string): void {
        this._fuseProgressBarService.show();
        this.fuelStationService.getFuelStation(stationGuid).subscribe(
            result => {
                this.fuelStation = result;
                this._fuseProgressBarService.hide();
            },
            error => {
                console.error('Error: ' + error.message);
                this._fuseProgressBarService.hide();
            }
        );
    }

    public updateFuelStation(fuelStation: FuelStation): void {
        this.dialogRef = this._matDialog.open(FuelStationEditDialogComponent, {
            panelClass: 'fuel-station-edit-dialog',
            data: {
                fuelStation: fuelStation,
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
                        this.fuelStationService.updateFuelStation(formData.getRawValue()).then(() => {
                            this.getFuelStation(formData.getRawValue().stationGuid);
                        });
                        break;
                    case 'delete':
                        console.log('delete');
                        // this.deleteContact(contact);
                        break;
                }
            });
    }

    /**
     * Delete Contact
     */
    deleteFuelStation(stationGuid: string): void {
        this.confirmDialogRef = this._matDialog.open(FuseConfirmDialogComponent, {
            disableClose: false
        });

        this.confirmDialogRef.componentInstance.confirmMessage = 'Are you sure you want to delete?';

        this.confirmDialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.fuelStationService.deleteFuelStation(stationGuid).then(() => {
                    this.router.navigate(['developer-pages/fuel-station-list']).then();
                });
            }
            this.confirmDialogRef = null;
        });

    }
}
