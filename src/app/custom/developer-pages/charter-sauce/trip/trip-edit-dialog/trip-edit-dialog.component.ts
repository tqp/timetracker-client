import {Component, Inject, ViewEncapsulation} from '@angular/core';
import {Trip} from '../../charter-sauce-models/Trip';
import {FormBuilder, FormGroup} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {TripService} from '../../trip/trip.service';

@Component({
    selector: 'app-trip-edit-dialog',
    templateUrl: './trip-edit-dialog.component.html',
    styleUrls: ['./trip-edit-dialog.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class TripEditDialogComponent {
    public action: string;
    public trip: Trip;
    public tripForm: FormGroup;
    public tripLoaded = false;
    public dialogTitle: string;

    /**
     * Constructor
     *
     * @param {MatDialogRef<ContactsContactFormDialogComponent>} matDialogRef
     * @param data
     * @param tripService`
     * @param {FormBuilder} _formBuilder
     */
    constructor(
        public matDialogRef: MatDialogRef<TripEditDialogComponent>,
        @Inject(MAT_DIALOG_DATA) private data: any,
        private tripService: TripService,
        private _formBuilder: FormBuilder
    ) {
        // console.log('data', data);

        // Set the defaults
        this.action = data.action;
        this.trip = new Trip({});
        if (this.action === 'edit') {
            this.dialogTitle = 'Edit Trip';
            this.getTrip(data.tripGuid);
        } else {
            this.dialogTitle = 'New Trip';
        }

        this.tripForm = this.createTripForm();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Create contact form
     *
     * @returns {FormGroup}
     */
    createTripForm(): FormGroup {
        return this._formBuilder.group({
            tripGuid: [this.trip.tripGuid],
            tripName: [this.trip.tripName],
            tripStartDate: [this.trip.tripStartDate],
            tripEndDate: [this.trip.tripEndDate]
        });
    }

    private getTrip(tripGuid: string): void {
        this.tripService.getTrip(tripGuid).subscribe(
            result => {
                this.trip = result;
                this.tripLoaded = true;
                this.tripForm.controls['tripGuid'].patchValue(this.trip.tripGuid);
                this.tripForm.controls['tripName'].patchValue(this.trip.tripName);
                this.tripForm.controls['tripStartDate'].patchValue(this.trip.tripStartDate);
                this.tripForm.controls['tripEndDate'].patchValue(this.trip.tripEndDate);
            },
            error => {
                console.error('Error: ' + error.message);
            }
        );
        return null;
    }
}
