import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeTableComponent } from './employee-table.component';
import { MatIconModule } from '@angular/material/icon';
import { FuseSharedModule } from '../../../../@fuse/shared.module';
import { FuseHighlightModule, FuseWidgetModule } from '../../../../@fuse/components';
import { MatTableModule } from '@angular/material/table';

const routes: Routes = [
    {
        path: 'employee-table',
        component: EmployeeTableComponent
    }
];

@NgModule({
    declarations: [EmployeeTableComponent],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),

        MatIconModule,
        MatTableModule,

        FuseSharedModule,
        FuseHighlightModule,
        FuseWidgetModule
    ]
})
export class EmployeeTableModule {
}
