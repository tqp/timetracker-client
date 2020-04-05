import {Component, OnInit} from '@angular/core';
import {EmployeeDashboardService} from '../employee-dashboard/employee-dashboard.service';

@Component({
    selector: 'app-my-dashboard',
    templateUrl: './my-dashboard.component.html',
    styleUrls: ['./my-dashboard.component.scss']
})
export class MyDashboardComponent implements OnInit {
    title = 'My Dashboard';

    date: any;
    daysInThisMonth: any;
    daysInLastMonth: any;
    daysInNextMonth: any;
    monthNames: string[];
    currentMonth: any;
    currentYear: any;
    currentDate: any;
    timekeeping: Timekeeping[] = [];

    constructor(private employeeDashboardService: EmployeeDashboardService) {
    }

    ngOnInit(): void {
        this.date = new Date();
        this.monthNames = [
            'January', 'February', 'March', 'April', 'May', 'June',
            'July', 'August', 'September', 'October', 'November', 'December'
        ];
        this.getDaysOfMonth();
    }

    public getDaysOfMonth(): void {
        this.daysInLastMonth = [];
        this.daysInThisMonth = [];
        this.daysInNextMonth = [];

        this.currentMonth = this.monthNames[this.date.getMonth()];
        this.currentYear = this.date.getFullYear();

        console.log('Current Month: ' + this.currentMonth + ' ' + this.currentYear);

        this.getUserHoursByMonthAndYear();

        if (this.date.getMonth() === new Date().getMonth()) {
            this.currentDate = new Date().getDate();
        } else {
            this.currentDate = 999;
        }

        // Days In Last Month
        const firstDayThisMonth = new Date(this.date.getFullYear(), this.date.getMonth(), 1).getDay();
        const prevNumOfDays = new Date(this.date.getFullYear(), this.date.getMonth(), 0).getDate();
        for (let i = prevNumOfDays - (firstDayThisMonth - 1); i <= prevNumOfDays; i++) {
            this.daysInLastMonth.push(i);
        }
        // console.log('daysInLastMonth', this.daysInLastMonth);

        // Days In This Month
        const thisNumOfDays = new Date(this.date.getFullYear(), this.date.getMonth() + 1, 0).getDate();
        for (let i = 0; i < thisNumOfDays; i++) {
            const tkArray: Timekeeping[] = this.checkTimekeeping(new Date(this.date.getFullYear(), (this.date.getMonth()), i + 1).getTime());
            const val: number = tkArray.length > 0 ? tkArray[0].value : 0;
            this.daysInThisMonth.push(tkArray.length > 0 ? tkArray[0].value.toFixed(2) : '');
            // this.daysInThisMonth.push(i + 1);
        }
        // console.log('daysInThisMonth', this.daysInThisMonth);

        // Days In Next Month
        const lastDayThisMonth = new Date(this.date.getFullYear(), this.date.getMonth() + 1, 0).getDay();
        // const nextNumOfDays = new Date(this.date.getFullYear(), this.date.getMonth() + 2, 0).getDate();
        for (let i = 0; i < (6 - lastDayThisMonth); i++) {
            this.daysInNextMonth.push(i + i);
        }
        const totalDays = this.daysInLastMonth.length + this.daysInThisMonth.length + this.daysInNextMonth.length;
        if (totalDays < 29) {
            for (let i = (7 - lastDayThisMonth); i < ((7 - lastDayThisMonth) + 7); i++) {
                this.daysInNextMonth.push(i);
            }
        }
    }

    public goToLastMonth(): void {
        this.date = new Date(this.date.getFullYear(), this.date.getMonth(), 0);
        this.getDaysOfMonth();
    }

    public goToNextMonth(): void {
        this.date = new Date(this.date.getFullYear(), this.date.getMonth() + 2, 0);
        this.getDaysOfMonth();
    }

    public checkTimekeeping(comparisonDate: any): Timekeeping[] {
        return TimekeepingData.filter((item) => {
            // console.log('checking ' + item.date + ' against ' + comparisonDate);
            return item.date === comparisonDate;
        });
    }

    private getUserHoursByMonthAndYear(): any {
        this.employeeDashboardService.getEmployeeHoursByMonthAndYear().subscribe(
            result => {
                console.log('result', result);
            },
            error => {
                console.error('Error: ' + error.message);
            }
        );
    }
}

export interface Timekeeping {
    date?: any;
    value?: number;
}

const TimekeepingData: Timekeeping[] = [
    {date: new Date(2020, 1, 3).getTime(), value: 8.0},
    {date: new Date(2020, 1, 4).getTime(), value: 8.25},
    {date: new Date(2020, 1, 5).getTime(), value: 7.75},
    {date: new Date(2020, 1, 6).getTime(), value: 7.5},
    {date: new Date(2020, 1, 7).getTime(), value: 8},
    {date: new Date(2020, 1, 10).getTime(), value: 8.25},
    {date: new Date(2020, 1, 11).getTime(), value: 8.5},
    {date: new Date(2020, 1, 12).getTime(), value: 7.5},
    {date: new Date(2020, 1, 13).getTime(), value: 7.75},
    {date: new Date(2020, 1, 14).getTime(), value: 8.25},
    {date: new Date(2020, 1, 17).getTime(), value: 0},
    {date: new Date(2020, 1, 18).getTime(), value: 8.25},
];
