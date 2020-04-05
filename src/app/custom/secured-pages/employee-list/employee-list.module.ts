import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { FuseSharedModule } from '../../../../@fuse/shared.module';
import { FuseHighlightModule, FuseWidgetModule } from '../../../../@fuse/components';
import { EmployeeListComponent } from './employee-list.component';

const routes: Routes = [
    {
        path: 'employee-list',
        component: EmployeeListComponent
    }
];

@NgModule({
    declarations: [EmployeeListComponent],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),

        MatIconModule,
        MatTableModule,
        MatSortModule,

        FuseSharedModule,
        FuseHighlightModule,
        FuseWidgetModule
    ]
})
export class EmployeeListModule {
}
