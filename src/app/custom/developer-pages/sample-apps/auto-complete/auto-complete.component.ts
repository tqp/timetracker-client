import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {Observable, of} from 'rxjs';
import {AutoCompleteService} from './auto-complete.service';
import {catchError, debounceTime, map, startWith, switchMap} from 'rxjs/operators';
import {FuelStation} from '../../auto-tracker/auto-tracker-models/FuelStation';

@Component({
    selector: 'app-auto-complete',
    templateUrl: './auto-complete.component.html',
    styleUrls: ['./auto-complete.component.scss']
})
export class AutoCompleteComponent implements OnInit {
    // myForm: FormGroup;
    autoCompleteForm: FormGroup;
    stationNameAutoCompleteOptions: Observable<FuelStation[]>;

    constructor(private autoCompleteService: AutoCompleteService,
                private formBuilder: FormBuilder) {
    }

    ngOnInit(): void {

        // this.myForm = this.formBuilder.group({
        //     lastName: new FormControl(),
        //     firstName: new FormControl(),
        //     middleName: new FormControl(),
        //     address: this.formBuilder.group({
        //         street: new FormControl(),
        //         city: new FormControl(),
        //         state: new FormControl(),
        //         zipCode: new FormControl()
        //     })
        // });

        this.autoCompleteForm = this.createForm();

        // this.myForm.controls['lastName'].valueChanges.subscribe(lastName => {
        //  console.log('lastName', lastName);
        // });

        this.stationNameAutoCompleteOptions = this.autoCompleteForm.controls['stationName'].valueChanges.pipe(
            startWith(''),
            debounceTime(300),
            switchMap(value => {
                console.log('value', value);
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

    private createForm(): FormGroup {
        return this.formBuilder.group({
            stationName: new FormControl(),
            stationAddress: new FormControl()
        });
    }

    // public populateNameGroup(option: any): void {
    //     console.log('option', option);
    //     this.myForm.controls['firstName'].patchValue(option.firstName);
    //     this.myForm.controls['middleName'].patchValue(option.middleName);
    // }

    // public populateAddressGroup(option: any): void {
    //     console.log('option', option);
    //     this.myForm.controls['address'].get('street').patchValue(option.address);
    //     this.myForm.controls['address'].get('city').patchValue(option.city);
    //     this.myForm.controls['address'].get('state').patchValue(option.state);
    //     this.myForm.controls['address'].get('zipCode').patchValue(option.zipCode);
    // }

    public clickStationNameOption(option: FuelStation): void {
        console.log('option', option);
        this.autoCompleteForm.controls['stationAddress'].patchValue(option.stationAddress1);
    }
}
