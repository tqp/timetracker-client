import {AfterViewInit, Component, ElementRef, Inject, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {FuelActivity} from '../../../models/FuelActivity';
import {FuelStation} from '../../../models/FuelStation';
import {catchError, debounceTime, map, startWith, switchMap} from 'rxjs/operators';
import {Observable, of} from 'rxjs';
import {AutoCompleteService} from '../../auto-complete/auto-complete.service';
import {FuelActivityService} from '../fuel-activity.service';
import {MatTableDataSource} from '@angular/material/table';
import {FuelActivityStation} from '../../../models/FuelActivityStation';

@Component({
    selector: 'app-fuel-activity-edit-dialog',
    templateUrl: './fuel-activity-edit-dialog.component.html',
    styleUrls: ['./fuel-activity-edit-dialog.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class FuelActivityEditDialogComponent implements OnInit, AfterViewInit {
    action: string;
    activityGuid: string;
    activity: FuelActivity;
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
        // Set the defaults
        this.action = data.action;

        if (this.action === 'edit') {
            this.dialogTitle = 'Edit Fuel Activity';
            this.activity = new FuelActivity({});
            this.station = new FuelStation({});
            this.getFuelActivityWithStation(data.activityGuid);
        } else {
            this.dialogTitle = 'New Fuel Activity';
            this.activity = new FuelActivity({});
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
                console.log('value:', value);
                if (value !== '') {
                    return this.autoCompleteService.retrieveStationNameOptions(value.toLowerCase()).pipe(
                        map(results => {
                            // console.log('results', results);
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
                    activityGuid: [this.activity.activityGuid],
                    activityDate: [this.activity.activityDate],
                    activityOdometer: [this.activity.activityOdometer],
                    activityTripMeter: [this.activity.activityTripMeter],
                    activityMilesPerGallon: [this.activity.activityMilesPerGallon],
                    stationGuid: [this.activity.stationGuid],
                    activityGallons: [this.activity.activityGallons],
                    activityPricePerGallon: [this.activity.activityPricePerGallon],
                    activityTotalCost: [this.activity.activityTotalCost],
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

    private getFuelActivityWithStation(activityGuid: string): void {
        this.fuelActivityService.getFuelActivityWithStation(activityGuid).subscribe(
            result => {
                const activity: FuelActivityStation = result;

                const fuelActivitySubForm = this.activityForm.get('fuelActivity') as FormGroup;
                fuelActivitySubForm.controls['stationGuid'].patchValue(activity.fuelActivity.stationGuid, {emitEvent: false});
                fuelActivitySubForm.controls['activityDate'].patchValue(activity.fuelActivity.activityDate);
                fuelActivitySubForm.controls['activityOdometer'].patchValue(activity.fuelActivity.activityOdometer);
                fuelActivitySubForm.controls['activityTripMeter'].patchValue(activity.fuelActivity.activityTripMeter);
                fuelActivitySubForm.controls['activityMilesPerGallon'].patchValue(activity.fuelActivity.activityMilesPerGallon);
                fuelActivitySubForm.controls['activityGallons'].patchValue(activity.fuelActivity.activityGallons);
                fuelActivitySubForm.controls['activityPricePerGallon'].patchValue(activity.fuelActivity.activityPricePerGallon);

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

    get fuelActivitySubForm(): any {
        return this.activityForm.get('fuelActivity') as FormGroup;
    }

    get fuelStationSubForm(): any {
        return this.activityForm.get('fuelStation') as FormGroup;
    }

    public clickStationNameOption(option: FuelStation): void {
        console.log('option', option);
        this.fuelActivitySubForm.controls['stationGuid'].patchValue(option.stationGuid);
        this.fuelStationSubForm.controls['stationAffiliation'].patchValue(option.stationAffiliation);
        this.fuelStationSubForm.controls['stationAddress1'].patchValue(option.stationAddress1);
        this.fuelStationSubForm.controls['stationCity'].patchValue(option.stationCity);
        this.fuelStationSubForm.controls['stationState'].patchValue(option.stationState);
        this.fuelStationSubForm.controls['stationZip'].patchValue(option.stationZip);
        this.fuelStationSubForm.controls['stationPhone'].patchValue(option.stationPhone);
    }
}
