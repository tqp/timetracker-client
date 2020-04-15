import {Component, Inject, ViewEncapsulation} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {FuelActivity} from '../../../models/FuelActivity';

@Component({
    selector: 'app-fuel-activity-edit-dialog',
    templateUrl: './fuel-activity-edit-dialog.component.html',
    styleUrls: ['./fuel-activity-edit-dialog.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class FuelActivityEditDialogComponent {
    action: string;
    activity: FuelActivity;
    activityForm: FormGroup;
    dialogTitle: string;

    /**
     * Constructor
     *
     * @param {MatDialogRef<ContactsContactFormDialogComponent>} matDialogRef
     * @param _data
     * @param {FormBuilder} _formBuilder
     */
    constructor(
        public matDialogRef: MatDialogRef<FuelActivityEditDialogComponent>,
        @Inject(MAT_DIALOG_DATA) private _data: any,
        private _formBuilder: FormBuilder
    ) {
        // console.log('data', _data);

        // Set the defaults
        this.action = _data.action;

        if (this.action === 'edit') {
            this.dialogTitle = 'Edit Fuel Activity';
            this.activity = _data.fuelActivity;
        } else {
            this.dialogTitle = 'New Fuel Activity';
            this.activity = new FuelActivity({});
        }

        this.activityForm = this.createFuelActivityForm();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Create contact form
     *
     * @returns {FormGroup}
     */
    createFuelActivityForm(): FormGroup {
        return this._formBuilder.group({
            fuelActivityGuid: [this.activity.fuelActivityGuid],
            fuelActivityDate: [this.activity.fuelActivityDate],
            fuelActivityOdometer: [this.activity.fuelActivityOdometer],
            fuelActivityTripMeter: [this.activity.fuelActivityTripMeter],
            fuelActivityMilesPerGallon: [this.activity.fuelActivityMilesPerGallon],
            fuelActivityGallons: [this.activity.fuelActivityGallons],
            fuelActivityPricePerGallon: [this.activity.fuelActivityPricePerGallon],
            fuelActivityTotalCost: [this.activity.fuelActivityTotalCost]
        });
    }
}
