import {Component, OnInit} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {HolidayListService} from './holiday-list.service';
import {Holiday} from '../../models/Holiday';

@Component({
    selector: 'app-holiday-list',
    templateUrl: './holiday-list.component.html',
    styleUrls: ['./holiday-list.component.scss']
})
export class HolidayListComponent implements OnInit {
    public title = 'Holiday List';

    public displayedColumns: string[] = ['date', 'name'];
    public dataSource: MatTableDataSource<Holiday>;
    public pageSize: number;

    constructor(protected holidayListService: HolidayListService) {
    }

    ngOnInit(): void {
        this.calculatePageSize();
        this.getHolidayList();
    }

    private calculatePageSize(): void {
        const pixelsAboveTable = 300;
        const pixelsBelowTable = 50;
        const rowHeight = 49;
        this.pageSize = Math.round((window.innerHeight.valueOf() - pixelsAboveTable - pixelsBelowTable) / rowHeight);
    }

    private getHolidayList(): void {
        this.holidayListService.getHolidayList().subscribe(
            result => {
                console.log('getHolidayList: result=', result);
                const employeeList: Holiday[] = result;
                this.dataSource = new MatTableDataSource(employeeList);
            },
            error => {
                console.error('Error: ' + error.message);
                // this.authService.errorHandler(error);
            }
        );
    }
}
