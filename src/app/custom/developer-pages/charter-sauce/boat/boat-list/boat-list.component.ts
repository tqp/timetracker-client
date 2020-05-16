import {Component, OnInit, ViewChild} from '@angular/core';
import {MatSort} from '@angular/material/sort';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {FuseConfirmDialogComponent} from '@fuse/components/confirm-dialog/confirm-dialog.component';
import {ActivatedRoute, Router} from '@angular/router';
import {FuseProgressBarService} from '@fuse/components/progress-bar/progress-bar.service';
import {FuelActivityService} from '../../../auto-tracker/fuel-activity/fuel-activity.service';
import {AuthService} from '../../../../services/auth.service';
import {FormGroup} from '@angular/forms';
import {MatTableDataSource} from '@angular/material/table';
import {Boat} from '../../charter-sauce-models/Boat';
import {BoatService} from '../boat.service';
import {BoatEditDialogComponent} from '../boat-edit-dialog/boat-edit-dialog.component';

@Component({
    selector: 'app-boat-list',
    templateUrl: './boat-list.component.html',
    styleUrls: ['./boat-list.component.scss']
})
export class BoatListComponent implements OnInit {
    @ViewChild('dialogContent') public dialogRef: any;
    @ViewChild(MatSort, {static: true}) sort: MatSort;

    public title = 'Boat';
    public boatList: Boat[];
    public dataSource;
    public displayedColumns: string[] = [
        'boatName',
        'boatModel',
        'boatYear',
        'buttons'
    ];
    public tableHeight: number;
    public confirmDialogRef: MatDialogRef<FuseConfirmDialogComponent>;

    constructor(
        private activatedRoute: ActivatedRoute,
        private _fuseProgressBarService: FuseProgressBarService,
        private fuelActivityService: FuelActivityService,
        private boatService: BoatService,
        public _matDialog: MatDialog,
        private authService: AuthService,
        private router: Router
    ) {
        this.calculateTableHeight();
    }

    ngOnInit(): void {
        this.getBoatList();
    }

    private calculateTableHeight(): void {
        const pixelsAboveTable = 150;
        const pixelsBelowTable = 30;
        this.tableHeight = Math.round((window.innerHeight.valueOf() - pixelsAboveTable - pixelsBelowTable));
    }

    public createBoat(): void {
        this.dialogRef = this._matDialog.open(BoatEditDialogComponent, {
            panelClass: 'boat-edit-dialog',
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
                const boat: Boat = response.getRawValue();
                this.boatService.createBoat(boat).then((newBoat) => {
                    console.log('New Boat Created', newBoat);
                    this.getBoatList();
                });
            });
    }

    private getBoatList(): void {
        this._fuseProgressBarService.show();
        this.boatService.getBoatList().subscribe(
            (result: any) => {
                this.boatList = result;
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

    public editBoat(boatGuid: string): void {
        this.dialogRef = this._matDialog.open(BoatEditDialogComponent, {
            panelClass: 'boat-edit-dialog',
            data: {
                boatGuid: boatGuid,
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
                        this.boatService.updateBoat(formData.getRawValue()).then(() => {
                            this.getBoatList();
                        });
                        break;
                    case 'delete':
                        this.deleteBoat(boatGuid);
                        break;
                }
            });
    }

    deleteBoat(boatGuid: string): void {
        this.confirmDialogRef = this._matDialog.open(FuseConfirmDialogComponent, {
            disableClose: false
        });

        this.confirmDialogRef.componentInstance.confirmMessage = 'Are you sure you want to delete?';

        this.confirmDialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.boatService.deleteBoat(boatGuid).then(() => {
                    this.getBoatList();
                });
            }
            this.confirmDialogRef = null;
        });
    }

    public openDetail(boat: Boat): void {
        this.router.navigate(['/developer-pages/boat-detail', boat.boatGuid]).then();
    }
}
