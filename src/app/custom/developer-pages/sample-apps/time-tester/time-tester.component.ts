import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {TimeTesterService} from './time-tester.service';
import {TimeTester} from './TimeTester';
import * as moment from 'moment';

@Component({
    selector: 'app-time-tester',
    templateUrl: './time-tester.component.html',
    styleUrls: ['./time-tester.component.scss']
})
export class TimeTesterComponent implements OnInit {
    public title = 'Time Tester';
    public timeTesterForm: FormGroup;
    public testDateEpoch: string;
    public testDateDateTime: string;

    constructor(private _formBuilder: FormBuilder,
                private timeTesterService: TimeTesterService) {
        this.timeTesterForm = this.createTimeTesterForm();
    }

    ngOnInit(): void {
        this.calculateDates();

        this.getTimeTesterList();
        this.getTimeTester('6960779A56494039B093CE19FF2B3A25');
    }

    createTimeTesterForm(): FormGroup {
        return this._formBuilder.group({
            testDate: ['05/08/2020'],
            testTime: [''],
        });
    }

    public calculateDates(): void {
        console.log('calculateDates', this.timeTesterForm);
        this.testDateEpoch = this.timeTesterForm.get('testDate').value;
        this.testDateDateTime = new Date(this.timeTesterForm.get('testDate').value).toString();
    }

    public createTimeTester(): void {
        const timeTester: TimeTester = {};
        timeTester.timeEpoch = Date.now();
        console.log('epoch', timeTester.timeEpoch);
        timeTester.timeDateTime = new Date(2020, 1, 2, 13, 14, 15);
        timeTester.timeDate = new Date(2020, 2, 3);
        this.timeTesterService.createTimeTester(timeTester).then((newTimeTester) => {
            console.log('New Time Created', newTimeTester);
            this.getTimeTesterList();
        });
    }

    public getTimeTesterList(): void {
        this.timeTesterService.getTimeTesterList().subscribe(
            (result: any) => {
                // console.log('result', result);
            },
            error => {
                console.error('Error: ' + error.message);
            }
        );
    }

    private getTimeTester(timeGuid: string): void {
        this.timeTesterService.getTimeTester(timeGuid).subscribe(
            result => {
                // console.log('result', result);
            },
            error => {
                console.error('Error: ' + error.message);
            }
        );
    }

    public updateTimeTester(): void {
        const timeTester: TimeTester = {};
        timeTester.timeEpoch = Date.now();
        const date = new Date();

        console.log('date', date);
        // console.log('dateTime', moment(date).format('YYYY-DD-MM hh:mm:ss'));
        // console.log('date', moment(date).format('YYYY-DD-MM'));

        console.log('dateTime', new Date(2020, 1, 2, 13, 14, 15));

        timeTester.timeGuid = '565C54A4BAB24115B74112F332CEEC88';
        // timeTester.timeDateTime = moment(date).format('YYYY-DD-MM HH:mm:ss');
        timeTester.timeDateTime = new Date(2020, 1, 2, 13, 14, 15);
        // timeTester.timeDate = moment(date).format('YYYY-DD-MM');
        timeTester.timeDate = new Date(2020, 2, 3);

        this.timeTesterService.updateTimeTester(timeTester).then((newTimeTester) => {
            console.log('New Time Created', newTimeTester);
            this.getTimeTesterList();
        });
    }


}
