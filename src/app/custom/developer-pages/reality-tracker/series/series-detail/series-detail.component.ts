import {Component, OnInit, ViewChild} from '@angular/core';
import {MatSort} from '@angular/material/sort';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {FuseConfirmDialogComponent} from '@fuse/components/confirm-dialog/confirm-dialog.component';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthService} from '../../../../services/auth.service';
import {FuseProgressBarService} from '@fuse/components/progress-bar/progress-bar.service';
import {FormGroup} from '@angular/forms';
import {SeriesService} from '../series.service';
import {Series} from '../../reality-tracker-models/Series';
import {SeriesEditDialogComponent} from '../series-edit-dialog/series-edit-dialog.component';

@Component({
    selector: 'app-series-detail',
    templateUrl: './series-detail.component.html',
    styleUrls: ['./series-detail.component.scss']
})
export class SeriesDetailComponent implements OnInit {
    @ViewChild(MatSort, {static: true}) sort: MatSort;
    public seriesGuid: string;
    public series: Series;
    public dialogRef: any;
    public confirmDialogRef: MatDialogRef<FuseConfirmDialogComponent>;

    constructor(private route: ActivatedRoute,
                private router: Router,
                private seriesService: SeriesService,
                private authService: AuthService,
                private _fuseProgressBarService: FuseProgressBarService,
                public _matDialog: MatDialog) {
    }

    ngOnInit(): void {
        this.seriesGuid = this.route.snapshot.paramMap.get('guid');
        this.getSeries(this.seriesGuid);
    }

    private getSeries(seriesGuid: string): void {
        this._fuseProgressBarService.show();
        this.seriesService.getSeries(seriesGuid).subscribe(
            result => {
                this.series = result;
                this._fuseProgressBarService.hide();
            },
            error => {
                console.error('Error: ' + error.message);
                this._fuseProgressBarService.hide();
            }
        );
    }

    public editSeries(seriesGuid: string): void {
        this.dialogRef = this._matDialog.open(SeriesEditDialogComponent, {
            panelClass: 'series-edit-dialog',
            data: {
                seriesGuid: seriesGuid,
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
                        this.seriesService.updateSeries(formData.getRawValue()).then(() => {
                            this.getSeries(formData.getRawValue().seriesGuid);
                        });
                        break;
                    case 'delete':
                        console.log('delete');
                        // this.deleteContact(contact);
                        break;
                }
            });
    }

    public deleteSeries(seriesGuid: string): void {
        this.confirmDialogRef = this._matDialog.open(FuseConfirmDialogComponent, {
            disableClose: false
        });

        this.confirmDialogRef.componentInstance.confirmMessage = 'Are you sure you want to delete?';

        this.confirmDialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.seriesService.deleteSeries(seriesGuid).then(() => {
                    this.router.navigate(['developer-pages/series-list']).then();
                });
            }
            this.confirmDialogRef = null;
        });
    }

    public openDetail(series: Series): void {
        console.log('openDetail', series.seriesGuid);
        this.router.navigate(['/developer-pages/series-detail', series.seriesGuid]).then();
    }
}
