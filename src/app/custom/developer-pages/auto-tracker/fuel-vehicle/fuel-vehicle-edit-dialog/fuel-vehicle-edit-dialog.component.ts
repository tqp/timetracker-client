import {Component, Inject, OnInit, ViewEncapsulation} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {FuelVehicleService} from '../fuel-vehicle.service';
import {FuelVehicle} from '../../auto-tracker-models/FuelVehicle';

@Component({
    selector: 'app-fuel-vehicle-edit-dialog',
    templateUrl: './fuel-vehicle-edit-dialog.component.html',
    styleUrls: ['./fuel-vehicle-edit-dialog.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class FuelVehicleEditDialogComponent {
    public action: string;
    public fuelVehicle: FuelVehicle;
    public fuelVehicleForm: FormGroup;
    public fuelVehicleLoaded = false;
    public dialogTitle: string;

    /**
     * Constructor
     *
     * @param {MatDialogRef<ContactsContactFormDialogComponent>} matDialogRef
     * @param data
     * @param fuelVehicleService
     * @param {FormBuilder} _formBuilder
     */
    constructor(
        public matDialogRef: MatDialogRef<FuelVehicleEditDialogComponent>,
        @Inject(MAT_DIALOG_DATA) private data: any,
        private fuelVehicleService: FuelVehicleService,
        private _formBuilder: FormBuilder
    ) {
        console.log('data', data);

        // Set the defaults
        this.action = data.action;
        this.fuelVehicle = new FuelVehicle({});
        if (this.action === 'edit') {
            this.dialogTitle = 'Edit Vehicle';
            this.getFuelVehicle(data.vehicleGuid);
        } else {
            this.dialogTitle = 'New Vehicle';
        }

        this.fuelVehicleForm = this.createFuelVehicleForm();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Create contact form
     *
     * @returns {FormGroup}
     */
    createFuelVehicleForm(): FormGroup {
        return this._formBuilder.group({
            vehicleGuid: [this.fuelVehicle.vehicleGuid],
            vehicleName: [this.fuelVehicle.vehicleName],
            vehicleMake: [this.fuelVehicle.vehicleMake],
            vehicleModel: [this.fuelVehicle.vehicleModel],
            vehicleYear: [this.fuelVehicle.vehicleYear],
            vehicleVin: [this.fuelVehicle.vehicleVin],
        });
    }

    private getFuelVehicle(vehicleGuid: string): void {
        console.log('vehicleGuid', vehicleGuid);
        this.fuelVehicleService.getFuelVehicle(vehicleGuid).subscribe(
            result => {
                console.log('result', result);
                this.fuelVehicle = result;
                this.fuelVehicleLoaded = true;

                this.fuelVehicleForm.controls['vehicleGuid'].patchValue(this.fuelVehicle.vehicleGuid);
                this.fuelVehicleForm.controls['vehicleName'].patchValue(this.fuelVehicle.vehicleName);
                this.fuelVehicleForm.controls['vehicleMake'].patchValue(this.fuelVehicle.vehicleMake);
                this.fuelVehicleForm.controls['vehicleModel'].patchValue(this.fuelVehicle.vehicleModel);
                this.fuelVehicleForm.controls['vehicleYear'].patchValue(this.fuelVehicle.vehicleYear);
                this.fuelVehicleForm.controls['vehicleVin'].patchValue(this.fuelVehicle.vehicleVin);
            },
            error => {
                console.error('Error: ' + error.message);
            }
        );
        return null;
    }
}
