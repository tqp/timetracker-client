import {Component, Inject, OnInit, ViewEncapsulation} from '@angular/core';
import {Crew} from '../../charter-sauce-models/Crew';
import {FormBuilder, FormGroup} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {CrewService} from '../crew.service';

@Component({
    selector: 'app-crew-edit-dialog',
    templateUrl: './crew-edit-dialog.component.html',
    styleUrls: ['./crew-edit-dialog.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class CrewEditDialogComponent {
    public action: string;
    public crew: Crew;
    public crewForm: FormGroup;
    public crewLoaded = false;
    public dialogTitle: string;

    /**
     * Constructor
     *
     * @param {MatDialogRef<ContactsContactFormDialogComponent>} matDialogRef
     * @param data
     * @param crewService
     * @param {FormBuilder} _formBuilder
     */
    constructor(
        public matDialogRef: MatDialogRef<CrewEditDialogComponent>,
        @Inject(MAT_DIALOG_DATA) private data: any,
        private crewService: CrewService,
        private _formBuilder: FormBuilder
    ) {
        // console.log('data', data);

        // Set the defaults
        this.action = data.action;
        this.crew = new Crew({});
        if (this.action === 'edit') {
            this.dialogTitle = 'Edit Crew Member';
            this.getCrew(data.crewGuid);
        } else {
            this.dialogTitle = 'New Crew Member';
        }

        this.crewForm = this.createCrewForm();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Create contact form
     *
     * @returns {FormGroup}
     */
    createCrewForm(): FormGroup {
        return this._formBuilder.group({
            crewGuid: [this.crew.crewGuid],
            crewLastName: [this.crew.crewLastName],
            crewFirstName: [this.crew.crewFirstName]
        });
    }

    private getCrew(crewGuid: string): void {
        this.crewService.getCrew(crewGuid).subscribe(
            result => {
                this.crew = result;
                this.crewLoaded = true;
                this.crewForm.controls['crewGuid'].patchValue(this.crew.crewGuid);
                this.crewForm.controls['crewLastName'].patchValue(this.crew.crewLastName);
                this.crewForm.controls['crewFirstName'].patchValue(this.crew.crewFirstName);
            },
            error => {
                console.error('Error: ' + error.message);
            }
        );
        return null;
    }
}
