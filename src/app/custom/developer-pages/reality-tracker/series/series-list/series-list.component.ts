import {Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {MatSort} from '@angular/material/sort';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {FuseConfirmDialogComponent} from '@fuse/components/confirm-dialog/confirm-dialog.component';
import {ActivatedRoute, Router} from '@angular/router';
import {FuseProgressBarService} from '@fuse/components/progress-bar/progress-bar.service';
import {FuelActivityService} from '../../../auto-tracker/fuel-activity/fuel-activity.service';
import {AuthService} from '../../../../services/auth.service';
import {FormGroup} from '@angular/forms';
import {MatTableDataSource} from '@angular/material/table';
import {fuseAnimations} from '@fuse/animations';
import {SeriesService} from '../series.service';
import {SeriesEditDialogComponent} from '../series-edit-dialog/series-edit-dialog.component';
import {Series} from '../../reality-tracker-models/Series';

@Component({
    selector: 'app-series-list',
    templateUrl: './series-list.component.html',
    styleUrls: ['./series-list.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class SeriesListComponent implements OnInit {
    @ViewChild('dialogContent') public dialogRef: any;
    @ViewChild(MatSort, {static: true}) sort: MatSort;

    public title = 'Series';
    public seriesList: Series[];
    public dataSource;
    public displayedColumns: string[] = [
        'seriesName',
        'buttons'
    ];
    public tableHeight: number;
    public confirmDialogRef: MatDialogRef<FuseConfirmDialogComponent>;

    constructor(
        private activatedRoute: ActivatedRoute,
        private _fuseProgressBarService: FuseProgressBarService,
        private fuelActivityService: FuelActivityService,
        private seriesService: SeriesService,
        public _matDialog: MatDialog,
        private authService: AuthService,
        private router: Router
    ) {
        this.calculateTableHeight();
    }

    ngOnInit(): void {
        this.getSeriesList();
    }

    private calculateTableHeight(): void {
        const pixelsAboveTable = 150;
        const pixelsBelowTable = 30;
        this.tableHeight = Math.round((window.innerHeight.valueOf() - pixelsAboveTable - pixelsBelowTable));
    }

    public createSeries(): void {
        this.dialogRef = this._matDialog.open(SeriesEditDialogComponent, {
            panelClass: 'series-edit-dialog',
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
                const series: Series = response.getRawValue();
                this.seriesService.createSeries(series).then((newSeries) => {
                    console.log('New Series Created', newSeries);
                    this.getSeriesList();
                });
            });
    }

    private getSeriesList(): void {
        this._fuseProgressBarService.show();
        this.seriesService.getSeriesList().subscribe(
            (result: any) => {
                this.seriesList = result;
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
                            this.getSeriesList();
                        });
                        break;
                    case 'delete':
                        this.deleteSeries(seriesGuid);
                        break;
                }
            });
    }

    deleteSeries(seriesGuid: string): void {
        this.confirmDialogRef = this._matDialog.open(FuseConfirmDialogComponent, {
            disableClose: false
        });

        this.confirmDialogRef.componentInstance.confirmMessage = 'Are you sure you want to delete?';

        this.confirmDialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.seriesService.deleteSeries(seriesGuid).then(() => {
                    this.getSeriesList();
                });
            }
            this.confirmDialogRef = null;
        });
    }

    public openDetail(series: Series): void {
        this.router.navigate(['/developer-pages/series-detail', series.seriesGuid]).then();
    }
}
