import {Component, OnInit} from '@angular/core';
import { Employee } from '../../models/Employee';
import { MatTableDataSource } from '@angular/material/table';
import { EmployeeTableService } from './employee-table.service';

@Component({
    selector: 'app-employee-table',
    templateUrl: './employee-table.component.html',
    styleUrls: ['./employee-table.component.scss']
})
export class EmployeeTableComponent implements OnInit {
    public title = 'Employee Table';
    public displayedColumns: string[] = ['name', 'email'];
    public dataSource: MatTableDataSource<Employee>;
    public pageSize: number;

    constructor(protected employeeTableService: EmployeeTableService) {
    }

    ngOnInit(): void {
        this.calculatePageSize();
        this.getEmployeeList();
    }

    private calculatePageSize(): void {
        const pixelsAboveTable = 300;
        const pixelsBelowTable = 50;
        const rowHeight = 49;
        this.pageSize = Math.round((window.innerHeight.valueOf() - pixelsAboveTable - pixelsBelowTable) / rowHeight);
    }

    private getEmployeeList(): void {
        this.employeeTableService.getEmployeeList().subscribe(
            result => {
                // console.log('EmployeeTableComponent -> getEmployeeList: result=', result);
                const employeeList: Employee[] = result;
                this.dataSource = new MatTableDataSource(employeeList);
            },
            error => {
                console.error('Error: ' + error.message);
                // this.authService.errorHandler(error);
            }
        );
    }

}
