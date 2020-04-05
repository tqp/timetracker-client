import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Employee } from '../../models/Employee';
import { AuthService } from '../../services/auth.service';
import { EmployeeListService } from './employee-list.service';
import { FuseProgressBarService } from '../../../../@fuse/components/progress-bar/progress-bar.service';

@Component({
    selector: 'app-employee-list',
    templateUrl: './employee-list.component.html',
    styleUrls: ['./employee-list.component.scss']
})
export class EmployeeListComponent implements OnInit {
    public title = 'Employee List';
    public displayedColumns: string[] = ['name', 'email'];
    public dataSource: MatTableDataSource<Employee>;
    public tableHeight: number;

    constructor(protected employeeListService: EmployeeListService,
                protected authService: AuthService,
                private _fuseProgressBarService: FuseProgressBarService) {
    }

    ngOnInit(): void {
        this.calculateTableHeight();
        this.getEmployeeList();
    }

    private calculateTableHeight(): void {
        const pixelsAboveTable = 150;
        const pixelsBelowTable = 50;
        this.tableHeight = Math.round((window.innerHeight.valueOf() - pixelsAboveTable - pixelsBelowTable));
    }

    private getEmployeeList(): void {
        this._fuseProgressBarService.show();
        this.employeeListService.getEmployeeList().subscribe(
            result => {
                const employeeList: Employee[] = result;
                this.dataSource = new MatTableDataSource(employeeList);
                this._fuseProgressBarService.hide();
            },
            error => {
                console.error('Error: ' + error.message);
                this.authService.errorHandler(error);
                this._fuseProgressBarService.hide();
            }
        );
    }

}
