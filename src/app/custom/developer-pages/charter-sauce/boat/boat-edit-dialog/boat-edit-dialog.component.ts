import {Component, Inject, ViewEncapsulation} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Boat} from '../../charter-sauce-models/Boat';
import {BoatService} from '../boat.service';

@Component({
    selector: 'app-boat-edit-dialog',
    templateUrl: './boat-edit-dialog.component.html',
    styleUrls: ['./boat-edit-dialog.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class BoatEditDialogComponent {
    public action: string;
    public boat: Boat;
    public boatForm: FormGroup;
    public boatLoaded = false;
    public dialogTitle: string;

    /**
     * Constructor
     *
     * @param {MatDialogRef<ContactsContactFormDialogComponent>} matDialogRef
     * @param data
     * @param boatService
     * @param {FormBuilder} _formBuilder
     */
    constructor(
        public matDialogRef: MatDialogRef<BoatEditDialogComponent>,
        @Inject(MAT_DIALOG_DATA) private data: any,
        private boatService: BoatService,
        private _formBuilder: FormBuilder
    ) {
        // console.log('data', data);

        // Set the defaults
        this.action = data.action;
        this.boat = new Boat({});
        if (this.action === 'edit') {
            this.dialogTitle = 'Edit Boat';
            this.getBoat(data.boatGuid);
        } else {
            this.dialogTitle = 'New Boat';
        }

        this.boatForm = this.createBoatForm();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Create contact form
     *
     * @returns {FormGroup}
     */
    createBoatForm(): FormGroup {
        return this._formBuilder.group({
            boatGuid: [this.boat.boatGuid],
            boatName: [this.boat.boatName],
            boatModel: [this.boat.boatModel],
            boatYear: [this.boat.boatYear],
            boatDoubleCabinCount: [this.boat.boatDoubleCabinCount],
            boatBunkBedCount: [this.boat.boatBunkBedCount],
            boatForePeakCabinCount: [this.boat.boatForePeakCabinCount],
        });
    }

    private getBoat(boatGuid: string): void {
        this.boatService.getBoat(boatGuid).subscribe(
            result => {
                this.boat = result;
                this.boatLoaded = true;
                this.boatForm.controls['boatGuid'].patchValue(this.boat.boatGuid);
                this.boatForm.controls['boatName'].patchValue(this.boat.boatName);
                this.boatForm.controls['boatModel'].patchValue(this.boat.boatModel);
                this.boatForm.controls['boatYear'].patchValue(this.boat.boatYear);
                this.boatForm.controls['boatDoubleCabinCount'].patchValue(this.boat.boatDoubleCabinCount);
                this.boatForm.controls['boatBunkBedCount'].patchValue(this.boat.boatBunkBedCount);
                this.boatForm.controls['boatForePeakCabinCount'].patchValue(this.boat.boatForePeakCabinCount);
            },
            error => {
                console.error('Error: ' + error.message);
            }
        );
        return null;
    }
}
