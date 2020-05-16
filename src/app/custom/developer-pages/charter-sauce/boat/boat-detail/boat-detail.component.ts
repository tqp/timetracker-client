import {Component, OnInit, ViewChild} from '@angular/core';
import {MatSort} from '@angular/material/sort';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {FuseConfirmDialogComponent} from '../../../../../../@fuse/components/confirm-dialog/confirm-dialog.component';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthService} from '../../../../services/auth.service';
import {FuseProgressBarService} from '../../../../../../@fuse/components/progress-bar/progress-bar.service';
import {FormGroup} from '@angular/forms';
import {Boat} from '../../charter-sauce-models/Boat';
import {BoatService} from '../boat.service';
import {BoatEditDialogComponent} from '../boat-edit-dialog/boat-edit-dialog.component';

@Component({
    selector: 'app-boat-detail',
    templateUrl: './boat-detail.component.html',
    styleUrls: ['./boat-detail.component.scss']
})
export class BoatDetailComponent implements OnInit {
    @ViewChild(MatSort, {static: true}) sort: MatSort;
    public boatGuid: string;
    public boat: Boat;
    public dialogRef: any;
    public confirmDialogRef: MatDialogRef<FuseConfirmDialogComponent>;

    constructor(private route: ActivatedRoute,
                private router: Router,
                private boatService: BoatService,
                private authService: AuthService,
                private _fuseProgressBarService: FuseProgressBarService,
                public _matDialog: MatDialog) {
    }

    ngOnInit(): void {
        this.boatGuid = this.route.snapshot.paramMap.get('guid');
        this.getBoat(this.boatGuid);
    }

    private getBoat(boatGuid: string): void {
        this._fuseProgressBarService.show();
        this.boatService.getBoat(boatGuid).subscribe(
            result => {
                this.boat = result;
                this._fuseProgressBarService.hide();
            },
            error => {
                console.error('Error: ' + error.message);
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
                            this.getBoat(formData.getRawValue().boatGuid);
                        });
                        break;
                    case 'delete':
                        console.log('delete');
                        // this.deleteContact(contact);
                        break;
                }
            });
    }

    public deleteBoat(boatGuid: string): void {
        this.confirmDialogRef = this._matDialog.open(FuseConfirmDialogComponent, {
            disableClose: false
        });

        this.confirmDialogRef.componentInstance.confirmMessage = 'Are you sure you want to delete?';

        this.confirmDialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.boatService.deleteBoat(boatGuid).then(() => {
                    this.router.navigate(['developer-pages/boat-list']).then();
                });
            }
            this.confirmDialogRef = null;
        });
    }

    public openDetail(boat: Boat): void {
        console.log('openDetail', boat.boatGuid);
        this.router.navigate(['/developer-pages/boat-detail', boat.boatGuid]).then();
    }
}
