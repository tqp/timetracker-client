import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {MatIconModule} from '@angular/material/icon';
import {FuseSharedModule} from '../../../../@fuse/shared.module';
import {FuseHighlightModule, FuseWidgetModule} from '../../../../@fuse/components';
import {EmployeeDashboardComponent} from './employee-dashboard.component';

const routes: Routes = [
    {
        path: 'employee-dashboard',
        component: EmployeeDashboardComponent
    }
];

@NgModule({
    declarations: [EmployeeDashboardComponent],
    imports: [
        RouterModule.forChild(routes),
        CommonModule,

        MatIconModule,

        FuseSharedModule,
        FuseHighlightModule,
        FuseWidgetModule
    ]
})
export class EmployeeDashboardModule {
}
