import {Component, Inject, ViewEncapsulation} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {FuelStation} from '../../auto-tracker-models/FuelStation';
import {FuelStationService} from '../fuel-station.service';

@Component({
    selector: 'app-fuel-station-edit-dialog',
    templateUrl: './fuel-station-edit-dialog.component.html',
    styleUrls: ['./fuel-station-edit-dialog.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class FuelStationEditDialogComponent {
    public action: string;
    public fuelStation: FuelStation;
    public fuelStationForm: FormGroup;
    public fuelStationLoaded = false;
    public dialogTitle: string;

    /**
     * Constructor
     *
     * @param {MatDialogRef<ContactsContactFormDialogComponent>} matDialogRef
     * @param data
     * @param fuelStationService
     * @param {FormBuilder} _formBuilder
     */
    constructor(
        public matDialogRef: MatDialogRef<FuelStationEditDialogComponent>,
        @Inject(MAT_DIALOG_DATA) private data: any,
        private fuelStationService: FuelStationService,
        private _formBuilder: FormBuilder
    ) {
        // console.log('data', data);

        // Set the defaults
        this.action = data.action;
        this.fuelStation = new FuelStation({});
        if (this.action === 'edit') {
            this.dialogTitle = 'Edit Station';
            this.getFuelStation(data.stationGuid);
        } else {
            this.dialogTitle = 'New Station';
        }

        this.fuelStationForm = this.createFuelStationForm();
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
            stationGuid: [this.fuelStation.stationGuid],
            stationName: [this.fuelStation.stationName],
            stationAffiliation: [this.fuelStation.stationAffiliation],
            stationAddress1: [this.fuelStation.stationAddress1],
            stationAddress2: [this.fuelStation.stationAddress2],
            stationCity: [this.fuelStation.stationCity],
            stationState: [this.fuelStation.stationState],
            stationZip: [this.fuelStation.stationZip],
            stationPhone: [this.fuelStation.stationPhone]
        });
    }

    private getFuelStation(stationGuid: string): void {
        this.fuelStationService.getFuelStation(stationGuid).subscribe(
            result => {
                this.fuelStation = result;
                this.fuelStationLoaded = true;

                this.fuelStationForm.controls['stationGuid'].patchValue(this.fuelStation.stationGuid);
                this.fuelStationForm.controls['stationName'].patchValue(this.fuelStation.stationName);
                this.fuelStationForm.controls['stationAffiliation'].patchValue(this.fuelStation.stationAffiliation);
                this.fuelStationForm.controls['stationAddress1'].patchValue(this.fuelStation.stationAddress1);
                this.fuelStationForm.controls['stationCity'].patchValue(this.fuelStation.stationCity);
                this.fuelStationForm.controls['stationState'].patchValue(this.fuelStation.stationState);
                this.fuelStationForm.controls['stationZip'].patchValue(this.fuelStation.stationZip);
                this.fuelStationForm.controls['stationPhone'].patchValue(this.fuelStation.stationPhone);
            },
            error => {
                console.error('Error: ' + error.message);
            }
        );
        return null;
    }
}
