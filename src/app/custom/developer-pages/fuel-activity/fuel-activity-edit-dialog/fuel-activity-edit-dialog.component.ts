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
    activityGuid: string;
    activity: FuelFill;
    station: FuelStation;
    activityForm: FormGroup;
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

        if (this.action === 'edit') {
            this.dialogTitle = 'Edit Fuel Activity';
            this.activity = new FuelFill({});
            this.station = new FuelStation({});
            this.getFuelActivity(data.fillGuid);
        } else {
            this.dialogTitle = 'New Fuel Activity';
            this.activity = new FuelFill({});
            this.station = new FuelStation({});
        }

        this.activityForm = this.createFuelActivityForm();
    }

    ngOnInit(): void {
        const fuelStationSubForm = this.activityForm.get('fuelStation') as FormGroup;
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

            fuelActivity: this._formBuilder.group({
                    activityGuid: [this.activity.fillGuid],
                    activityDate: [this.activity.fillDate],
                    activityOdometer: [this.activity.fillOdometer],
                    activityTripMeter: [this.activity.fillMilesTraveled],
                    activityMilesPerGallon: [this.activity.fillMilesPerGallon],
                    stationGuid: [this.activity.stationGuid],
                    activityGallons: [this.activity.fillGallons],
                    activityPricePerGallon: [this.activity.fillCostPerGallon],
                    activityTotalCost: [this.activity.fillTotalCost],
                }
            ),

            fuelStation: this._formBuilder.group({
                    stationGuid: [this.station.stationGuid],
                    stationName: [this.station.stationName],
                    stationAffiliation: [this.station.stationAffiliation],
                    stationAddress1: [this.station.stationAddress1],
                    stationAddress2: [this.station.stationAddress2],
                    stationCity: [this.station.stationCity],
                    stationState: [this.station.stationState],
                    stationZip: [this.station.stationZip],
                    stationPhone: [this.station.stationPhone]
                }
            )
        });
    }

    private getFuelActivity(fillGuid: string): void {
        this.fuelActivityService.getFuelActivity(fillGuid).subscribe(
            result => {
                const activity: FuelActivity = result;

                const fuelActivitySubForm = this.activityForm.get('fuelActivity') as FormGroup;
                fuelActivitySubForm.controls['stationGuid'].patchValue(activity.fuelFill.stationGuid, {emitEvent: false});
                fuelActivitySubForm.controls['activityDate'].patchValue(activity.fuelFill.fillDate);
                fuelActivitySubForm.controls['activityOdometer'].patchValue(activity.fuelFill.fillOdometer);
                fuelActivitySubForm.controls['activityTripMeter'].patchValue(activity.fuelFill.fillMilesTraveled);
                fuelActivitySubForm.controls['activityMilesPerGallon'].patchValue(activity.fuelFill.fillMilesPerGallon);
                fuelActivitySubForm.controls['activityGallons'].patchValue(activity.fuelFill.fillGallons);
                fuelActivitySubForm.controls['activityPricePerGallon'].patchValue(activity.fuelFill.fillCostPerGallon);

                const fuelStationSubForm = this.activityForm.get('fuelStation') as FormGroup;
                fuelStationSubForm.controls['stationName'].patchValue(activity.fuelStation.stationName, {emitEvent: false});
                fuelStationSubForm.controls['stationAffiliation'].patchValue(activity.fuelStation.stationAffiliation);
                fuelStationSubForm.controls['stationAddress1'].patchValue(activity.fuelStation.stationAddress1);
                fuelStationSubForm.controls['stationCity'].patchValue(activity.fuelStation.stationCity);
                fuelStationSubForm.controls['stationState'].patchValue(activity.fuelStation.stationState);
                fuelStationSubForm.controls['stationZip'].patchValue(activity.fuelStation.stationZip);
                fuelStationSubForm.controls['stationPhone'].patchValue(activity.fuelStation.stationPhone);
            },
            error => {
                console.error('Error: ' + error.message);
            }
        );
        return null;
    }

    get activitySubForm(): any {
        return this.activityForm.get('fuelActivity') as FormGroup;
    }

    get stationSubForm(): any {
        return this.activityForm.get('fuelStation') as FormGroup;
    }

    public clickStationNameOption(option: FuelStation): void {
        console.log('option', option);
        this.activitySubForm.controls['stationGuid'].patchValue(option.stationGuid);
        this.stationSubForm.controls['stationAffiliation'].patchValue(option.stationAffiliation);
        this.stationSubForm.controls['stationAddress1'].patchValue(option.stationAddress1);
        this.stationSubForm.controls['stationCity'].patchValue(option.stationCity);
        this.stationSubForm.controls['stationState'].patchValue(option.stationState);
        this.stationSubForm.controls['stationZip'].patchValue(option.stationZip);
        this.stationSubForm.controls['stationPhone'].patchValue(option.stationPhone);
    }
}
