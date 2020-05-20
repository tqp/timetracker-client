import {Component, OnInit, ViewChild} from '@angular/core';
import {MatSort} from '@angular/material/sort';
import {Crew} from '../../charter-sauce-models/Crew';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {FuseConfirmDialogComponent} from '../../../../../../@fuse/components/confirm-dialog/confirm-dialog.component';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthService} from '../../../../services/auth.service';
import {FuseProgressBarService} from '../../../../../../@fuse/components/progress-bar/progress-bar.service';
import {FormGroup} from '@angular/forms';
import {CrewService} from '../crew.service';
import {CrewEditDialogComponent} from '../crew-edit-dialog/crew-edit-dialog.component';

@Component({
    selector: 'app-crew-detail',
    templateUrl: './crew-detail.component.html',
    styleUrls: ['./crew-detail.component.scss']
})
export class CrewDetailComponent implements OnInit {
    @ViewChild(MatSort, {static: true}) sort: MatSort;
    public crewGuid: string;
    public crew: Crew;
    public dialogRef: any;
    public confirmDialogRef: MatDialogRef<FuseConfirmDialogComponent>;

    constructor(private route: ActivatedRoute,
                private router: Router,
                private crewService: CrewService,
                private authService: AuthService,
                private _fuseProgressBarService: FuseProgressBarService,
                public _matDialog: MatDialog) {
    }

    ngOnInit(): void {
        this.crewGuid = this.route.snapshot.paramMap.get('guid');
        this.getCrew(this.crewGuid);
    }

    private getCrew(crewGuid: string): void {
        this._fuseProgressBarService.show();
        this.crewService.getCrew(crewGuid).subscribe(
            result => {
                this.crew = result;
                this._fuseProgressBarService.hide();
            },
            error => {
                console.error('Error: ' + error.message);
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
                            this.getCrew(formData.getRawValue().crewGuid);
                        });
                        break;
                    case 'delete':
                        console.log('delete');
                        // this.deleteContact(contact);
                        break;
                }
            });
    }

    public deleteCrew(crewGuid: string): void {
        this.confirmDialogRef = this._matDialog.open(FuseConfirmDialogComponent, {
            disableClose: false
        });

        this.confirmDialogRef.componentInstance.confirmMessage = 'Are you sure you want to delete?';

        this.confirmDialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.crewService.deleteCrew(crewGuid).then(() => {
                    this.router.navigate(['developer-pages/crew-list']).then();
                });
            }
            this.confirmDialogRef = null;
        });
    }

    public openDetail(crew: Crew): void {
        console.log('openDetail', crew.crewGuid);
        this.router.navigate(['/developer-pages/crew-detail', crew.crewGuid]).then();
    }
}
