import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {MatIconModule} from '@angular/material/icon';
import {FuseSharedModule} from '../../../../../@fuse/shared.module';
import {FuseHighlightModule, FuseWidgetModule} from '../../../../../@fuse/components';
import {HighchartsChartModule} from 'highcharts-angular';
import {AutoTrackerDashboardComponent} from './auto-tracker-dashboard.component';

const routes: Routes = [
    {
        path: 'auto-tracker-dashboard',
        component: AutoTrackerDashboardComponent
    }
];

@NgModule({
    declarations: [AutoTrackerDashboardComponent],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),

        MatIconModule,

        FuseSharedModule,
        FuseHighlightModule,
        FuseWidgetModule,

        HighchartsChartModule
    ]
})
export class AutoTrackerDashboardModule {
}
