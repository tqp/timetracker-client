import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ManagerDashboardComponent } from './manager-dashboard.component';
import { FuseSharedModule } from '../../../../@fuse/shared.module';
import { FuseHighlightModule, FuseWidgetModule } from '../../../../@fuse/components';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { ChartsModule } from 'ng2-charts';
import { NgxChartsModule } from '@swimlane/ngx-charts';

const routes: Routes = [
    {
        path: 'manager-dashboard',
        component: ManagerDashboardComponent
    }
];

@NgModule({
    declarations: [ManagerDashboardComponent],
    imports: [
        RouterModule.forChild(routes),
        CommonModule,

        MatIconModule,
        MatTableModule,
        MatSortModule,

        ChartsModule,
        NgxChartsModule,

        FuseSharedModule,
        FuseHighlightModule,
        FuseWidgetModule
    ]
})
export class ManagerDashboardModule {
}
