import {Component, Inject, ViewEncapsulation} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Series} from '../../reality-tracker-models/Series';
import {SeriesService} from '../series.service';

@Component({
    selector: 'app-series-edit-dialog',
    templateUrl: './series-edit-dialog.component.html',
    styleUrls: ['./series-edit-dialog.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class SeriesEditDialogComponent {
    public action: string;
    public series: Series;
    public seriesForm: FormGroup;
    public seriesLoaded = false;
    public dialogTitle: string;

    /**
     * Constructor
     *
     * @param {MatDialogRef<ContactsContactFormDialogComponent>} matDialogRef
     * @param data
     * @param seriesService
     * @param {FormBuilder} _formBuilder
     */
    constructor(
        public matDialogRef: MatDialogRef<SeriesEditDialogComponent>,
        @Inject(MAT_DIALOG_DATA) private data: any,
        private seriesService: SeriesService,
        private _formBuilder: FormBuilder
    ) {
        console.log('data', data);

        // Set the defaults
        this.action = data.action;
        this.series = new Series({});
        if (this.action === 'edit') {
            this.dialogTitle = 'Edit Series';
            this.getSeries(data.seriesGuid);
        } else {
            this.dialogTitle = 'New Series';
        }

        this.seriesForm = this.createSeriesForm();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Create contact form
     *
     * @returns {FormGroup}
     */
    createSeriesForm(): FormGroup {
        return this._formBuilder.group({
            seriesGuid: [this.series.seriesGuid],
            seriesName: [this.series.seriesName]
        });
    }

    private getSeries(seriesGuid: string): void {
        console.log('seriesGuid', seriesGuid);
        this.seriesService.getSeries(seriesGuid).subscribe(
            result => {
                console.log('result', result);
                this.series = result;
                this.seriesLoaded = true;
                this.seriesForm.controls['seriesGuid'].patchValue(this.series.seriesGuid);
                this.seriesForm.controls['seriesName'].patchValue(this.series.seriesName);
            },
            error => {
                console.error('Error: ' + error.message);
            }
        );
        return null;
    }
}
