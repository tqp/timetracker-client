import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FuelActivityService} from '../fuel-activity.service';
import {FuseProgressBarService} from '../../../../../@fuse/components/progress-bar/progress-bar.service';
import {FuelActivity} from '../../../models/FuelActivity';
import {FormGroup} from '@angular/forms';
import {FuseConfirmDialogComponent} from '../../../../../@fuse/components/confirm-dialog/confirm-dialog.component';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {FuelActivityEditDialogComponent} from '../fuel-activity-edit-dialog/fuel-activity-edit-dialog.component';

@Component({
    selector: 'app-fuel-activity-detail',
    templateUrl: './fuel-activity-detail.component.html',
    styleUrls: ['./fuel-activity-detail.component.scss']
})
export class FuelActivityDetailComponent implements OnInit {
    public guid: string;
    public fuelActivity: FuelActivity;
    public dialogRef: any;
    public confirmDialogRef: MatDialogRef<FuseConfirmDialogComponent>;

    constructor(private route: ActivatedRoute,
                private router: Router,
                private fuelActivityService: FuelActivityService,
                private _fuseProgressBarService: FuseProgressBarService,
                public _matDialog: MatDialog) {
    }

    ngOnInit(): void {
        this.guid = this.route.snapshot.paramMap.get('guid');
        this.getFuelActivity(this.guid);
    }

    private getFuelActivity(fillGuid: string): void {
        this.fuelActivityService.getFuelActivity(fillGuid).subscribe(
            result => {
                console.log('result', result);
                this.fuelActivity = result;
                this._fuseProgressBarService.hide();
            },
            error => {
                console.error('Error: ' + error.message);
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
                            this.getFuelActivity(formData.getRawValue().fuelFill.fillGuid);
                        });
                        break;
                    case 'delete':
                        console.log('delete');
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
                    this.router.navigate(['developer-pages/fuel-activity-list']).then();
                });
            }
            this.confirmDialogRef = null;
        });
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
