import {Component, OnInit, ViewChild} from '@angular/core';
import {MatSort} from '@angular/material/sort';
import {Trip} from '../../charter-sauce-models/Trip';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {FuseConfirmDialogComponent} from '@fuse/components/confirm-dialog/confirm-dialog.component';
import {ActivatedRoute, Router} from '@angular/router';
import {TripService} from '../trip.service';
import {AuthService} from '../../../../services/auth.service';
import {FuseProgressBarService} from '@fuse/components/progress-bar/progress-bar.service';
import {TripEditDialogComponent} from '../trip-edit-dialog/trip-edit-dialog.component';
import {FormGroup} from '@angular/forms';
import {MatTableDataSource} from '@angular/material/table';
import {Crew} from '../../charter-sauce-models/Crew';
import {CrewService} from '../../crew/crew.service';

@Component({
  selector: 'app-trip-detail',
  templateUrl: './trip-detail.component.html',
  styleUrls: ['./trip-detail.component.scss']
})
export class TripDetailComponent implements OnInit {
    @ViewChild(MatSort, {static: true}) sort: MatSort;
    public tripGuid: string;
    public trip: Trip;
    public crewList: Crew[];

    public dataSource;
    public displayedColumns: string[] = [
        'crewName'
    ];

    public dialogRef: any;
    public confirmDialogRef: MatDialogRef<FuseConfirmDialogComponent>;

    constructor(private route: ActivatedRoute,
                private router: Router,
                private tripService: TripService,
                private crewService: CrewService,
                private authService: AuthService,
                private _fuseProgressBarService: FuseProgressBarService,
                public _matDialog: MatDialog) {
    }

    ngOnInit(): void {
        this.tripGuid = this.route.snapshot.paramMap.get('guid');
        this.getTrip(this.tripGuid);
        this.getCrewListByTrip(this.tripGuid);
    }

    private getTrip(tripGuid: string): void {
        this._fuseProgressBarService.show();
        this.tripService.getTrip(tripGuid).subscribe(
            result => {
                this.trip = result;
                this._fuseProgressBarService.hide();
            },
            error => {
                console.error('Error: ' + error.message);
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
                            this.getTrip(formData.getRawValue().tripGuid);
                        });
                        break;
                    case 'delete':
                        console.log('delete');
                        // this.deleteContact(contact);
                        break;
                }
            });
    }

    public deleteTrip(tripGuid: string): void {
        this.confirmDialogRef = this._matDialog.open(FuseConfirmDialogComponent, {
            disableClose: false
        });

        this.confirmDialogRef.componentInstance.confirmMessage = 'Are you sure you want to delete?';

        this.confirmDialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.tripService.deleteTrip(tripGuid).then(() => {
                    this.router.navigate(['developer-pages/trip-list']).then();
                });
            }
            this.confirmDialogRef = null;
        });
    }

    public openDetail(trip: Trip): void {
        console.log('openDetail', trip.tripGuid);
        this.router.navigate(['/developer-pages/trip-detail', trip.tripGuid]).then();
    }

    private getCrewListByTrip(tripGuid: string): void {
        this._fuseProgressBarService.show();
        this.crewService.getCrewListByTrip(tripGuid).subscribe(
            (result: any) => {
                console.log('result');
                this.crewList = result;
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
}
