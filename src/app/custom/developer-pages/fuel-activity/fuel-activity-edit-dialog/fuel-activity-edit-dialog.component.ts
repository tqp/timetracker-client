import {AfterViewInit, Component, ElementRef, Inject, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {FuelFill} from '../../../models/FuelFill';
import {FuelStation} from '../../../models/FuelStation';
import {catchError, debounceTime, map, startWith, switchMap} from 'rxjs/operators';
import {Observable, of} from 'rxjs';
import {AutoCompleteService} from '../../auto-complete/auto-complete.service';
import {FuelActivityService} from '../fuel-activity.service';
import {FuelActivity} from '../../../models/FuelActivity';

@Component({
    selector: 'app-fuel-activity-edit-dialog',
    templateUrl: './fuel-activity-edit-dialog.component.html',
    styleUrls: ['./fuel-activity-edit-dialog.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class FuelActivityEditDialogComponent implements OnInit, AfterViewInit {
    action: string;
    fuelActivity: FuelActivity;
    fuelActivityLoaded = false;
    fuelFill: FuelFill;
    fuelStation: FuelStation;
    fuelActivityForm: FormGroup;
    dialogTitle: string;
    stationNameAutoCompleteOptions: Observable<FuelStation[]>;

    @ViewChild('stationName', {static: false}) stationName: ElementRef;

    /**
     * Constructor
     *
     * @param {MatDialogRef<ContactsContactFormDialogComponent>} matDialogRef
     * @param data
     * @param {FormBuilder} _formBuilder
     * @param fuelActivityService
     * @param autoCompleteService
     */
    constructor(
        public matDialogRef: MatDialogRef<FuelActivityEditDialogComponent>,
        @Inject(MAT_DIALOG_DATA) private data: any,
        private _formBuilder: FormBuilder,
        private fuelActivityService: FuelActivityService,
        private autoCompleteService: AutoCompleteService
    ) {
        // console.log('data', data);

        // Set the defaults
        this.action = data.action;
        this.fuelFill = new FuelFill({});
        this.fuelStation = new FuelStation({});
        if (this.action === 'edit') {
            this.dialogTitle = 'Edit Fuel Activity';
            this.getFuelActivity(data.fillGuid);
        } else {
            this.dialogTitle = 'New Fuel Activity';
        }

        this.fuelActivityForm = this.createFuelActivityForm();
    }

    ngOnInit(): void {
        const fuelStationSubForm = this.fuelActivityForm.get('fuelStation') as FormGroup;
        this.stationNameAutoCompleteOptions = fuelStationSubForm.controls['stationName'].valueChanges.pipe(
            startWith(''),
            debounceTime(300),
            switchMap((value: string) => {
                if (value !== '') {
                    return this.autoCompleteService.retrieveStationNameOptions(value.toLowerCase()).pipe(
                        map(results => {
                            return results;
                        }),
                        catchError(() => {
                            return of(null);
                        })
                    );
                } else {
                    return of(null);
                }
            })
        );
    }

    ngAfterViewInit(): void {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    createFuelActivityForm(): FormGroup {
        return this._formBuilder.group({

            fuelFill: this._formBuilder.group({
                    fillGuid: [this.fuelFill.fillGuid],
                    fillDate: [this.fuelFill.fillDate],
                    fillTime: [this.fuelFill.fillTime],
                    fillOdometer: [this.fuelFill.fillOdometer],
                    fillMilesTraveled: [this.fuelFill.fillMilesTraveled],
                    fillMilesPerGallon: [this.fuelFill.fillMilesPerGallon],
                    stationGuid: [this.fuelFill.stationGuid],
                    fillGallons: [this.fuelFill.fillGallons],
                    fillCostPerGallon: [this.fuelFill.fillCostPerGallon],
                    fillTotalCost: [this.fuelFill.fillTotalCost],
                    fillComments: [this.fuelFill.fillComments]
                }
            ),

            fuelStation: this._formBuilder.group({
                    stationGuid: [this.fuelStation.stationGuid],
                    stationName: [this.fuelStation.stationName],
                    stationAffiliation: [this.fuelStation.stationAffiliation],
                    stationAddress1: [this.fuelStation.stationAddress1],
                    stationAddress2: [this.fuelStation.stationAddress2],
                    stationCity: [this.fuelStation.stationCity],
                    stationState: [this.fuelStation.stationState],
                    stationZip: [this.fuelStation.stationZip],
                    stationPhone: [this.fuelStation.stationPhone]
                }
            )
        });
    }

    private getFuelActivity(fillGuid: string): void {
        console.log('fillGuid', fillGuid);
        this.fuelActivityService.getFuelActivity(fillGuid).subscribe(
            result => {
                this.fuelActivity = result;
                this.fuelActivityLoaded = true;

                const fuelFillSubForm = this.fuelActivityForm.get('fuelFill') as FormGroup;
                fuelFillSubForm.controls['stationGuid'].patchValue(this.fuelActivity.fuelFill.stationGuid, {emitEvent: false});
                fuelFillSubForm.controls['fillGuid'].patchValue(this.fuelActivity.fuelFill.fillGuid);
                fuelFillSubForm.controls['fillDate'].patchValue(this.fuelActivity.fuelFill.fillDate);
                fuelFillSubForm.controls['fillTime'].patchValue(this.fuelActivity.fuelFill.fillTime);
                fuelFillSubForm.controls['fillOdometer'].patchValue(this.fuelActivity.fuelFill.fillOdometer);
                fuelFillSubForm.controls['fillMilesTraveled'].patchValue(this.fuelActivity.fuelFill.fillMilesTraveled.toFixed(1));
                fuelFillSubForm.controls['fillMilesPerGallon'].patchValue(this.fuelActivity.fuelFill.fillMilesPerGallon.toFixed(1));
                fuelFillSubForm.controls['fillGallons'].patchValue(this.fuelActivity.fuelFill.fillGallons.toFixed(3));
                fuelFillSubForm.controls['fillCostPerGallon'].patchValue(this.fuelActivity.fuelFill.fillCostPerGallon.toFixed(3));
                fuelFillSubForm.controls['fillTotalCost'].patchValue(this.fuelActivity.fuelFill.fillTotalCost.toFixed(2));
                fuelFillSubForm.controls['fillComments'].patchValue(this.fuelActivity.fuelFill.fillComments);

                const fuelStationSubForm = this.fuelActivityForm.get('fuelStation') as FormGroup;
                fuelStationSubForm.controls['stationName'].patchValue(this.fuelActivity.fuelStation.stationName, {emitEvent: false});
                fuelStationSubForm.controls['stationAffiliation'].patchValue(this.fuelActivity.fuelStation.stationAffiliation);
                fuelStationSubForm.controls['stationAddress1'].patchValue(this.fuelActivity.fuelStation.stationAddress1);
                fuelStationSubForm.controls['stationCity'].patchValue(this.fuelActivity.fuelStation.stationCity);
                fuelStationSubForm.controls['stationState'].patchValue(this.fuelActivity.fuelStation.stationState);
                fuelStationSubForm.controls['stationZip'].patchValue(this.fuelActivity.fuelStation.stationZip);
                fuelStationSubForm.controls['stationPhone'].patchValue(this.fuelActivity.fuelStation.stationPhone);
            },
            error => {
                console.error('Error: ' + error.message);
            }
        );
        return null;
    }

    get fillSubForm(): any {
        return this.fuelActivityForm.get('fuelFill') as FormGroup;
    }

    get stationSubForm(): any {
        return this.fuelActivityForm.get('fuelStation') as FormGroup;
    }

    public clickStationNameOption(option: FuelStation): void {
        console.log('option', option);
        this.fillSubForm.controls['stationGuid'].patchValue(option.stationGuid);
        this.stationSubForm.controls['stationAffiliation'].patchValue(option.stationAffiliation);
        this.stationSubForm.controls['stationAddress1'].patchValue(option.stationAddress1);
        this.stationSubForm.controls['stationCity'].patchValue(option.stationCity);
        this.stationSubForm.controls['stationState'].patchValue(option.stationState);
        this.stationSubForm.controls['stationZip'].patchValue(option.stationZip);
        this.stationSubForm.controls['stationPhone'].patchValue(option.stationPhone);
    }
}
