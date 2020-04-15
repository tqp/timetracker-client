import {Component, Inject, ViewEncapsulation} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {FuelStation} from '../../../models/FuelStation';

@Component({
    selector: 'app-fuel-station-edit-dialog',
    templateUrl: './fuel-station-edit-dialog.component.html',
    styleUrls: ['./fuel-station-edit-dialog.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class FuelStationEditDialogComponent {
    action: string;
    station: FuelStation;
    stationForm: FormGroup;
    dialogTitle: string;

    /**
     * Constructor
     *
     * @param {MatDialogRef<ContactsContactFormDialogComponent>} matDialogRef
     * @param _data
     * @param {FormBuilder} _formBuilder
     */
    constructor(
        public matDialogRef: MatDialogRef<FuelStationEditDialogComponent>,
        @Inject(MAT_DIALOG_DATA) private _data: any,
        private _formBuilder: FormBuilder
    ) {
        // console.log('data', _data);

        // Set the defaults
        this.action = _data.action;

        if (this.action === 'edit') {
            this.dialogTitle = 'Edit Station';
            this.station = _data.fuelStation;
        } else {
            this.dialogTitle = 'New Station';
            this.station = new FuelStation({});
        }

        this.stationForm = this.createFuelStationForm();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Create contact form
     *
     * @returns {FormGroup}
     */
    createFuelStationForm(): FormGroup {
        return this._formBuilder.group({
            stationGuid: [this.station.stationGuid],
            stationName: [this.station.stationName],
            stationAffiliation: [this.station.stationAffiliation],
            stationAddress1: [this.station.stationAddress1],
            stationAddress2: [this.station.stationAddress2],
            stationCity: [this.station.stationCity],
            stationState: [this.station.stationState],
            stationZip: [this.station.stationZip],
            stationPhone: [this.station.stationPhone]
        });
    }
}
