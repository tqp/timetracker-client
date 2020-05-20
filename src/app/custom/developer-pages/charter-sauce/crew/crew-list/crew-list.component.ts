import {Component, OnInit, ViewChild} from '@angular/core';
import {MatSort} from '@angular/material/sort';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {FuseConfirmDialogComponent} from '../../../../../../@fuse/components/confirm-dialog/confirm-dialog.component';
import {ActivatedRoute, Router} from '@angular/router';
import {FuseProgressBarService} from '../../../../../../@fuse/components/progress-bar/progress-bar.service';
import {FuelActivityService} from '../../../auto-tracker/fuel-activity/fuel-activity.service';
import {AuthService} from '../../../../services/auth.service';
import {FormGroup} from '@angular/forms';
import {MatTableDataSource} from '@angular/material/table';
import {Crew} from '../../charter-sauce-models/Crew';
import {CrewService} from '../crew.service';
import {CrewEditDialogComponent} from '../crew-edit-dialog/crew-edit-dialog.component';

@Component({
  selector: 'app-crew-list',
  templateUrl: './crew-list.component.html',
  styleUrls: ['./crew-list.component.scss']
})
export class CrewListComponent implements OnInit {
    @ViewChild('dialogContent') public dialogRef: any;
    @ViewChild(MatSort, {static: true}) sort: MatSort;

    public title = 'Crew';
    public crewList: Crew[];
    public dataSource;
    public displayedColumns: string[] = [
        'crewLastName',
        'crewFirstName',
        'buttons'
    ];
    public tableHeight: number;
    public confirmDialogRef: MatDialogRef<FuseConfirmDialogComponent>;

    constructor(
        private activatedRoute: ActivatedRoute,
        private _fuseProgressBarService: FuseProgressBarService,
        private fuelActivityService: FuelActivityService,
        private crewService: CrewService,
        public _matDialog: MatDialog,
        private authService: AuthService,
        private router: Router
    ) {
        this.calculateTableHeight();
    }

    ngOnInit(): void {
        this.getCrewList();
    }

    private calculateTableHeight(): void {
        const pixelsAboveTable = 150;
        const pixelsBelowTable = 30;
        this.tableHeight = Math.round((window.innerHeight.valueOf() - pixelsAboveTable - pixelsBelowTable));
    }

    public createCrew(): void {
        this.dialogRef = this._matDialog.open(CrewEditDialogComponent, {
            panelClass: 'crew-edit-dialog',
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
                const crew: Crew = response.getRawValue();
                this.crewService.createCrew(crew).then((newCrew) => {
                    console.log('New Crew Created', newCrew);
                    this.getCrewList();
                });
            });
    }

    private getCrewList(): void {
        this._fuseProgressBarService.show();
        this.crewService.getCrewList().subscribe(
            (result: any) => {
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

    public editCrew(crewGuid: string): void {
        this.dialogRef = this._matDialog.open(CrewEditDialogComponent, {
            panelClass: 'crew-edit-dialog',
            data: {
                crewGuid: crewGuid,
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
                        this.crewService.updateCrew(formData.getRawValue()).then(() => {
                            this.getCrewList();
                        });
                        break;
                    case 'delete':
                        this.deleteCrew(crewGuid);
                        break;
                }
            });
    }

    deleteCrew(crewGuid: string): void {
        this.confirmDialogRef = this._matDialog.open(FuseConfirmDialogComponent, {
            disableClose: false
        });

        this.confirmDialogRef.componentInstance.confirmMessage = 'Are you sure you want to delete?';

        this.confirmDialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.crewService.deleteCrew(crewGuid).then(() => {
                    this.getCrewList();
                });
            }
            this.confirmDialogRef = null;
        });
    }

    public openDetail(crew: Crew): void {
        this.router.navigate(['/developer-pages/crew-detail', crew.crewGuid]).then();
    }
}
